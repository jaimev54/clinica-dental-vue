<script setup lang="ts">
import ServiceCard from '@/components/ServiceCard.vue'
import { SERVICES } from '@/data/services'
import { BOOKING_LINK } from '@/data/site'

// Los datos son estáticos, así que basta un filtro normal (no hace falta computed).
const featuredServices = SERVICES.filter((service) => service.featured)
</script>

<template>
  <section class="bg-linear-to-b from-teal-50 to-white">
    <div class="mx-auto max-w-6xl px-4 py-20 text-center md:py-28">
      <h1 class="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
        Tu sonrisa en las mejores manos
      </h1>
      <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
        Atención dental para toda la familia: prevención, estética y ortodoncia con un trato cercano
        y sin complicaciones.
      </p>
      <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <RouterLink
          :to="BOOKING_LINK.to"
          class="rounded-full bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800"
        >
          Agendar cita
        </RouterLink>
        <RouterLink
          to="/servicios"
          class="rounded-full border border-teal-700 px-6 py-3 font-semibold text-teal-700 hover:bg-teal-50"
        >
          Ver servicios
        </RouterLink>
      </div>
    </div>
  </section>

  <section aria-labelledby="services-heading" class="mx-auto max-w-6xl px-4 py-16">
    <h2 id="services-heading" class="text-3xl font-bold text-slate-900">Nuestros servicios</h2>
    <p class="mt-2 text-slate-600">Algunos de los tratamientos más solicitados.</p>

    <ul class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <li v-for="service in featuredServices" :key="service.id">
        <ServiceCard :service="service" />
      </li>
    </ul>

    <RouterLink
      to="/servicios"
      class="mt-8 inline-block font-semibold text-teal-700 hover:underline"
    >
      Ver todos los servicios <span aria-hidden="true">→</span>
    </RouterLink>
  </section>
</template>
