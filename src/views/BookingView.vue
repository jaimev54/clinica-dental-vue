<script setup lang="ts">
import { computed, nextTick, reactive, ref, useTemplateRef, watch } from 'vue'
import FormField from '@/components/FormField.vue'
import { isValidEmail, useFormValidation, type FieldErrors } from '@/composables/useFormValidation'
import { DOCTORS } from '@/data/doctors'
import { SCHEDULE } from '@/data/schedule'
import { SERVICES } from '@/data/services'
import type { BookingField, BookingForm } from '@/types/booking'
import { submitNetlifyForm } from '@/utils/netlifyForms'

const MAX_DAYS_AHEAD = 60
const NOTES_MAX_LENGTH = 500

// Orden de los campos en pantalla: se usa para enfocar el primer campo con error.
const FIELD_ORDER: BookingField[] = [
  'name',
  'email',
  'phone',
  'service',
  'doctor',
  'date',
  'time',
  'notes',
]

function emptyForm(): BookingForm {
  return { name: '', email: '', phone: '', service: '', doctor: '', date: '', time: '', notes: '' }
}

// --- Fechas (todo en hora local, formato YYYY-MM-DD) ---
function toIsoDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

function daysFromToday(days: number): Date {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date
}

function parseIsoDate(value: string): Date | null {
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return null
  return new Date(year, month - 1, day)
}

const minDate = toIsoDate(daysFromToday(1))
const maxDate = toIsoDate(daysFromToday(MAX_DAYS_AHEAD))

// --- Estado del formulario ---
// reactive() hace reactivo un objeto completo; v-model enlaza cada campo (como [(ngModel)]).
const form = reactive<BookingForm>(emptyForm())
const botField = ref('') // honeypot: si un bot lo llena, Netlify descarta el envío
const isSending = ref(false)
const submitError = ref('')
const isSubmitted = ref(false)
const successHeading = useTemplateRef<HTMLHeadingElement>('successHeading')

// Horas disponibles según el día elegido y el horario de la clínica.
const availableTimes = computed(() => {
  const date = parseIsoDate(form.date)
  const hours = date ? SCHEDULE[date.getDay()] : null
  if (!hours) return []

  const times: string[] = []
  for (let hour = hours.open; hour < hours.close; hour++) {
    times.push(`${String(hour).padStart(2, '0')}:00`)
  }
  return times
})

// Si cambia la fecha y la hora elegida ya no está disponible, se borra.
watch(availableTimes, (times) => {
  if (!times.includes(form.time)) form.time = ''
})

// --- Validación ---
const errors = computed(() => {
  const result: FieldErrors<BookingField> = {}

  if (form.name.trim().length < 3) result.name = 'Escribe tu nombre completo.'

  if (!isValidEmail(form.email)) {
    result.email = 'Escribe un correo válido, por ejemplo nombre@correo.com.'
  }

  if (!/^\d{10}$/.test(form.phone.replace(/[\s-]/g, ''))) {
    result.phone = 'Escribe un teléfono de 10 dígitos.'
  }

  if (!form.service) result.service = 'Elige un servicio.'
  if (!form.doctor) result.doctor = 'Elige un doctor.'

  if (!form.date) {
    result.date = 'Elige una fecha.'
  } else if (form.date < minDate || form.date > maxDate) {
    result.date = `Elige una fecha entre mañana y los próximos ${MAX_DAYS_AHEAD} días.`
  } else if (availableTimes.value.length === 0) {
    result.date = 'La clínica no abre ese día. Elige otra fecha.'
  }

  if (!form.time) {
    result.time = result.date ? 'Primero elige una fecha válida.' : 'Elige una hora.'
  }

  if (form.notes.length > NOTES_MAX_LENGTH) {
    result.notes = `Máximo ${NOTES_MAX_LENGTH} caracteres.`
  }

  return result
})

const { touch, errorFor, describedBy, inputClass, validate, reset } = useFormValidation({
  errors,
  fieldOrder: FIELD_ORDER,
  idPrefix: 'booking',
})

// --- Resumen tras enviar ---
const selectedDoctor = computed(() => DOCTORS.find((doctor) => doctor.id === form.doctor))
const selectedService = computed(() => SERVICES.find((service) => service.id === form.service))
const formattedDate = computed(() => {
  const date = parseIsoDate(form.date)
  return date ? new Intl.DateTimeFormat('es-MX', { dateStyle: 'full' }).format(date) : ''
})

async function handleSubmit() {
  if (!validate() || isSending.value) return

  isSending.value = true
  submitError.value = ''
  try {
    // Se envían nombres legibles (no ids) para que el aviso de Netlify se entienda.
    await submitNetlifyForm('booking', {
      'bot-field': botField.value,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      service: selectedService.value?.name ?? form.service,
      doctor: selectedDoctor.value?.name ?? form.doctor,
      date: formattedDate.value,
      time: form.time,
      notes: form.notes.trim(),
    })
    isSubmitted.value = true
    await nextTick()
    successHeading.value?.focus()
  } catch {
    submitError.value = 'No pudimos enviar tu solicitud. Revisa tu conexión e inténtalo de nuevo.'
  } finally {
    isSending.value = false
  }
}

function resetForm() {
  Object.assign(form, emptyForm())
  botField.value = ''
  submitError.value = ''
  reset()
  isSubmitted.value = false
}
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-12 md:py-16">
    <h1 class="text-4xl font-bold tracking-tight text-slate-900">Agendar cita</h1>

    <div
      v-if="isSubmitted"
      class="mt-8 rounded-2xl border border-teal-200 bg-teal-50 p-6 md:p-8"
      role="status"
    >
      <h2
        ref="successHeading"
        tabindex="-1"
        class="text-2xl font-bold text-teal-800 focus:outline-none"
      >
        ¡Solicitud recibida!
      </h2>
      <p class="mt-2 text-slate-700">
        Gracias, {{ form.name.trim() }}. Este es el resumen de tu cita:
      </p>

      <dl class="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-[auto_1fr]">
        <dt class="font-medium text-slate-900">Servicio</dt>
        <dd class="text-slate-700">{{ selectedService?.name }}</dd>
        <dt class="font-medium text-slate-900">Doctor</dt>
        <dd class="text-slate-700">{{ selectedDoctor?.name }}</dd>
        <dt class="font-medium text-slate-900">Fecha</dt>
        <dd class="text-slate-700 first-letter:uppercase">{{ formattedDate }}</dd>
        <dt class="font-medium text-slate-900">Hora</dt>
        <dd class="text-slate-700">{{ form.time }}</dd>
      </dl>

      <p class="mt-6 text-sm text-slate-600">
        Este es un sitio de demostración: no se agenda ninguna cita real.
      </p>
      <button
        type="button"
        class="mt-6 rounded-full border border-teal-700 px-6 py-2 font-semibold text-teal-700 hover:bg-white"
        @click="resetForm"
      >
        Agendar otra cita
      </button>
    </div>

    <template v-else>
      <p class="mt-3 text-lg text-slate-600">
        Elige el servicio, el doctor y el horario que prefieras. Revisaremos tu solicitud y te
        contactaremos.
      </p>
      <p class="mt-2 text-sm text-slate-600">
        Los campos marcados con <span class="text-red-700">*</span> son obligatorios.
      </p>

      <form
        name="booking"
        novalidate
        class="mt-8 grid gap-6 md:grid-cols-2"
        @submit.prevent="handleSubmit"
      >
        <!-- Honeypot: oculto para personas; los bots suelen llenarlo. -->
        <p hidden>
          <label>
            No llenes este campo:
            <input v-model="botField" name="bot-field" tabindex="-1" autocomplete="off" />
          </label>
        </p>

        <FormField
          id="booking-name"
          label="Nombre completo"
          required
          :error="errorFor('name')"
          class="md:col-span-2"
        >
          <input
            id="booking-name"
            v-model="form.name"
            type="text"
            autocomplete="name"
            required
            :class="inputClass('name')"
            :aria-invalid="!!errorFor('name')"
            :aria-describedby="describedBy('name')"
            @blur="touch('name')"
          />
        </FormField>

        <FormField
          id="booking-email"
          label="Correo electrónico"
          required
          :error="errorFor('email')"
        >
          <input
            id="booking-email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            required
            :class="inputClass('email')"
            :aria-invalid="!!errorFor('email')"
            :aria-describedby="describedBy('email')"
            @blur="touch('email')"
          />
        </FormField>

        <FormField id="booking-phone" label="Teléfono" required :error="errorFor('phone')">
          <input
            id="booking-phone"
            v-model="form.phone"
            type="tel"
            inputmode="numeric"
            autocomplete="tel"
            placeholder="81 1234 5678"
            required
            :class="inputClass('phone')"
            :aria-invalid="!!errorFor('phone')"
            :aria-describedby="describedBy('phone')"
            @blur="touch('phone')"
          />
        </FormField>

        <FormField id="booking-service" label="Servicio" required :error="errorFor('service')">
          <select
            id="booking-service"
            v-model="form.service"
            required
            :class="inputClass('service')"
            :aria-invalid="!!errorFor('service')"
            :aria-describedby="describedBy('service')"
            @blur="touch('service')"
          >
            <option value="" disabled>Selecciona un servicio</option>
            <option v-for="service in SERVICES" :key="service.id" :value="service.id">
              {{ service.name }}
            </option>
          </select>
        </FormField>

        <FormField id="booking-doctor" label="Doctor" required :error="errorFor('doctor')">
          <select
            id="booking-doctor"
            v-model="form.doctor"
            required
            :class="inputClass('doctor')"
            :aria-invalid="!!errorFor('doctor')"
            :aria-describedby="describedBy('doctor')"
            @blur="touch('doctor')"
          >
            <option value="" disabled>Selecciona un doctor</option>
            <option v-for="doctor in DOCTORS" :key="doctor.id" :value="doctor.id">
              {{ doctor.name }} — {{ doctor.specialty }}
            </option>
          </select>
        </FormField>

        <FormField id="booking-date" label="Fecha" required :error="errorFor('date')">
          <input
            id="booking-date"
            v-model="form.date"
            type="date"
            :min="minDate"
            :max="maxDate"
            required
            :class="inputClass('date')"
            :aria-invalid="!!errorFor('date')"
            :aria-describedby="describedBy('date')"
            @blur="touch('date')"
            @change="touch('date')"
          />
        </FormField>

        <FormField id="booking-time" label="Hora" required :error="errorFor('time')">
          <select
            id="booking-time"
            v-model="form.time"
            required
            :disabled="availableTimes.length === 0"
            :class="inputClass('time')"
            :aria-invalid="!!errorFor('time')"
            :aria-describedby="describedBy('time')"
            @blur="touch('time')"
          >
            <option value="" disabled>
              {{ availableTimes.length ? 'Selecciona una hora' : 'Primero elige una fecha' }}
            </option>
            <option v-for="time in availableTimes" :key="time" :value="time">{{ time }}</option>
          </select>
        </FormField>

        <FormField
          id="booking-notes"
          label="Comentarios (opcional)"
          :error="errorFor('notes')"
          class="md:col-span-2"
        >
          <textarea
            id="booking-notes"
            v-model="form.notes"
            rows="4"
            :maxlength="NOTES_MAX_LENGTH"
            :class="inputClass('notes')"
            :aria-invalid="!!errorFor('notes')"
            :aria-describedby="describedBy('notes')"
            @blur="touch('notes')"
          />
          <p class="mt-1 text-right text-xs text-slate-500">
            {{ form.notes.length }}/{{ NOTES_MAX_LENGTH }}
          </p>
        </FormField>

        <div class="md:col-span-2">
          <p
            v-if="submitError"
            role="alert"
            class="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {{ submitError }}
          </p>
          <button
            type="submit"
            :disabled="isSending"
            class="w-full rounded-full bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
          >
            {{ isSending ? 'Enviando…' : 'Solicitar cita' }}
          </button>
        </div>
      </form>
    </template>
  </div>
</template>
