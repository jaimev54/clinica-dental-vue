<script setup lang="ts">
import { computed, ref } from 'vue'
import ServiceCard from '@/components/ServiceCard.vue'
import { CATEGORY_LABELS, SERVICES } from '@/data/services'
import type { ServiceCategory } from '@/types/service'

type CategoryFilter = ServiceCategory | 'todas'

// Opciones del filtro: "Todas" + cada categoría definida en CATEGORY_LABELS.
const filterOptions: { value: CategoryFilter; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  ...(Object.keys(CATEGORY_LABELS) as ServiceCategory[]).map((category) => ({
    value: category,
    label: CATEGORY_LABELS[category],
  })),
]

// Estado reactivo (como un signal) y valor derivado (como computed() en Angular).
const selectedCategory = ref<CategoryFilter>('todas')

const filteredServices = computed(() =>
  selectedCategory.value === 'todas'
    ? SERVICES
    : SERVICES.filter((service) => service.category === selectedCategory.value),
)
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-12 md:py-16">
    <h1 class="text-4xl font-bold tracking-tight text-slate-900">Servicios</h1>
    <p class="mt-3 max-w-2xl text-lg text-slate-600">
      Tratamientos para prevenir, restaurar y mejorar tu sonrisa. Filtra por categoría para
      encontrar lo que necesitas.
    </p>

    <div role="group" aria-label="Filtrar por categoría" class="mt-8 flex flex-wrap gap-2">
      <button
        v-for="option in filterOptions"
        :key="option.value"
        type="button"
        :aria-pressed="selectedCategory === option.value"
        class="rounded-full border px-4 py-2 text-sm font-medium transition-colors"
        :class="
          selectedCategory === option.value
            ? 'border-teal-700 bg-teal-700 text-white'
            : 'border-slate-300 bg-white text-slate-700 hover:border-teal-700 hover:text-teal-700'
        "
        @click="selectedCategory = option.value"
      >
        {{ option.label }}
      </button>
    </div>

    <section aria-labelledby="services-list-heading" class="mt-8">
      <h2 id="services-list-heading" class="sr-only">Lista de servicios</h2>
      <p aria-live="polite" class="text-sm text-slate-600">
        Mostrando {{ filteredServices.length }}
        {{ filteredServices.length === 1 ? 'servicio' : 'servicios' }}
      </p>

      <ul class="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="service in filteredServices" :key="service.id">
          <ServiceCard :service="service" />
        </li>
      </ul>
    </section>
  </div>
</template>
