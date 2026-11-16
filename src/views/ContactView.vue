<script setup lang="ts">
import { computed, nextTick, reactive, ref, useTemplateRef } from 'vue'
import FormField from '@/components/FormField.vue'
import { isValidEmail, useFormValidation, type FieldErrors } from '@/composables/useFormValidation'
import { DAY_NAMES, SCHEDULE } from '@/data/schedule'
import { CONTACT_INFO } from '@/data/site'
import type { ContactField, ContactForm } from '@/types/contact'
import { submitNetlifyForm } from '@/utils/netlifyForms'

const MESSAGE_MIN_LENGTH = 10
const MESSAGE_MAX_LENGTH = 1000
const FIELD_ORDER: ContactField[] = ['name', 'email', 'message']

// Horario de lunes a domingo (getDay() empieza en domingo = 0).
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0]
const scheduleRows = WEEK_ORDER.map((day) => {
  const hours = SCHEDULE[day]
  return {
    day: DAY_NAMES[day],
    hours: hours ? `${hours.open}:00 – ${hours.close}:00` : 'Cerrado',
  }
})

function emptyForm(): ContactForm {
  return { name: '', email: '', message: '' }
}

const form = reactive<ContactForm>(emptyForm())
const botField = ref('') // honeypot: si un bot lo llena, Netlify descarta el envío
const isSending = ref(false)
const submitError = ref('')
const isSubmitted = ref(false)
const successHeading = useTemplateRef<HTMLHeadingElement>('successHeading')

const errors = computed(() => {
  const result: FieldErrors<ContactField> = {}
  if (form.name.trim().length < 3) result.name = 'Escribe tu nombre.'
  if (!isValidEmail(form.email)) {
    result.email = 'Escribe un correo válido, por ejemplo nombre@correo.com.'
  }
  if (form.message.trim().length < MESSAGE_MIN_LENGTH) {
    result.message = `Escribe un mensaje de al menos ${MESSAGE_MIN_LENGTH} caracteres.`
  } else if (form.message.length > MESSAGE_MAX_LENGTH) {
    result.message = `Máximo ${MESSAGE_MAX_LENGTH} caracteres.`
  }
  return result
})

const { touch, errorFor, describedBy, inputClass, validate, reset } = useFormValidation({
  errors,
  fieldOrder: FIELD_ORDER,
  idPrefix: 'contact',
})

async function handleSubmit() {
  if (!validate() || isSending.value) return

  isSending.value = true
  submitError.value = ''
  try {
    await submitNetlifyForm('contact', {
      'bot-field': botField.value,
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    })
    isSubmitted.value = true
    await nextTick()
    successHeading.value?.focus()
  } catch {
    submitError.value = 'No pudimos enviar tu mensaje. Revisa tu conexión e inténtalo de nuevo.'
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
  <div class="mx-auto max-w-6xl px-4 py-12 md:py-16">
    <h1 class="text-4xl font-bold tracking-tight text-slate-900">Contacto</h1>
    <p class="mt-3 max-w-2xl text-lg text-slate-600">
      ¿Tienes dudas sobre algún tratamiento? Escríbenos o visítanos en nuestro horario de atención.
    </p>

    <div class="mt-10 grid gap-10 lg:grid-cols-[2fr_3fr]">
      <div class="space-y-8">
        <section aria-labelledby="contact-info-heading">
          <h2 id="contact-info-heading" class="text-xl font-semibold text-slate-900">
            Información
          </h2>
          <dl class="mt-4 space-y-3">
            <div>
              <dt class="text-sm font-medium text-slate-500">Dirección</dt>
              <dd class="text-slate-800">{{ CONTACT_INFO.address }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-slate-500">Teléfono</dt>
              <dd class="text-slate-800">{{ CONTACT_INFO.phone }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-slate-500">Correo</dt>
              <dd>
                <a :href="`mailto:${CONTACT_INFO.email}`" class="text-teal-700 hover:underline">
                  {{ CONTACT_INFO.email }}
                </a>
              </dd>
            </div>
          </dl>
          <p class="mt-3 text-sm text-slate-500">Datos ficticios para fines de demostración.</p>
        </section>

        <section aria-labelledby="schedule-heading">
          <h2 id="schedule-heading" class="text-xl font-semibold text-slate-900">Horario</h2>
          <dl class="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200">
            <div v-for="row in scheduleRows" :key="row.day" class="flex justify-between px-4 py-2">
              <dt class="text-slate-700">{{ row.day }}</dt>
              <dd
                :class="row.hours === 'Cerrado' ? 'text-slate-500' : 'font-medium text-slate-900'"
              >
                {{ row.hours }}
              </dd>
            </div>
          </dl>
        </section>
      </div>

      <section
        aria-labelledby="contact-form-heading"
        class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
      >
        <div v-if="isSubmitted" role="status">
          <h2
            id="contact-form-heading"
            ref="successHeading"
            tabindex="-1"
            class="text-2xl font-bold text-teal-800 focus:outline-none"
          >
            ¡Mensaje enviado!
          </h2>
          <p class="mt-2 text-slate-700">
            Gracias, {{ form.name.trim() }}. Te responderemos a {{ form.email.trim() }}.
          </p>
          <p class="mt-4 text-sm text-slate-600">
            Este es un sitio de demostración: el mensaje no llega a ninguna clínica real.
          </p>
          <button
            type="button"
            class="mt-6 rounded-full border border-teal-700 px-6 py-2 font-semibold text-teal-700 hover:bg-teal-50"
            @click="resetForm"
          >
            Enviar otro mensaje
          </button>
        </div>

        <template v-else>
          <h2 id="contact-form-heading" class="text-xl font-semibold text-slate-900">
            Envíanos un mensaje
          </h2>
          <p class="mt-1 text-sm text-slate-600">Todos los campos son obligatorios.</p>

          <form name="contact" novalidate class="mt-6 space-y-5" @submit.prevent="handleSubmit">
            <!-- Honeypot: oculto para personas; los bots suelen llenarlo. -->
            <p hidden>
              <label>
                No llenes este campo:
                <input v-model="botField" name="bot-field" tabindex="-1" autocomplete="off" />
              </label>
            </p>

            <FormField id="contact-name" label="Nombre" required :error="errorFor('name')">
              <input
                id="contact-name"
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
              id="contact-email"
              label="Correo electrónico"
              required
              :error="errorFor('email')"
            >
              <input
                id="contact-email"
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

            <FormField id="contact-message" label="Mensaje" required :error="errorFor('message')">
              <textarea
                id="contact-message"
                v-model="form.message"
                rows="5"
                required
                :maxlength="MESSAGE_MAX_LENGTH"
                :class="inputClass('message')"
                :aria-invalid="!!errorFor('message')"
                :aria-describedby="describedBy('message')"
                @blur="touch('message')"
              />
              <p class="mt-1 text-right text-xs text-slate-500">
                {{ form.message.length }}/{{ MESSAGE_MAX_LENGTH }}
              </p>
            </FormField>

            <p
              v-if="submitError"
              role="alert"
              class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            >
              {{ submitError }}
            </p>
            <button
              type="submit"
              :disabled="isSending"
              class="w-full rounded-full bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
            >
              {{ isSending ? 'Enviando…' : 'Enviar mensaje' }}
            </button>
          </form>
        </template>
      </section>
    </div>
  </div>
</template>
