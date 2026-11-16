<script setup lang="ts">
import DoctorCard from '@/components/DoctorCard.vue'
import { DOCTORS } from '@/data/doctors'
import { BOOKING_LINK } from '@/data/site'
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-12 md:py-16">
    <h1 class="text-4xl font-bold tracking-tight text-slate-900">Equipo</h1>
    <p class="mt-3 max-w-2xl text-lg text-slate-600">
      Especialistas que te acompañan en cada etapa de tu tratamiento.
    </p>

    <ul class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <li v-for="doctor in DOCTORS" :key="doctor.id">
        <DoctorCard :doctor="doctor" />
      </li>
    </ul>

    <div class="mt-12 rounded-2xl bg-teal-50 p-8 text-center">
      <p class="text-lg font-semibold text-slate-900">¿Quieres agendar con alguno de ellos?</p>
      <RouterLink
        :to="BOOKING_LINK.to"
        class="mt-4 inline-block rounded-full bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800"
      >
        {{ BOOKING_LINK.label }}
      </RouterLink>
    </div>
  </div>
</template>
