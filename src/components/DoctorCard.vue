<script setup lang="ts">
import { computed } from 'vue'
import type { Doctor } from '@/types/doctor'

const props = defineProps<{ doctor: Doctor }>()

// "Dra. Ana Torres" → "AT"
const initials = computed(() =>
  props.doctor.name
    .replace(/^Dra?\.\s*/, '')
    .split(' ')
    .map((word) => word.charAt(0))
    .join(''),
)
</script>

<template>
  <article
    class="flex h-full flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
  >
    <div
      aria-hidden="true"
      class="flex size-20 items-center justify-center rounded-full bg-teal-100 text-2xl font-bold text-teal-800"
    >
      {{ initials }}
    </div>
    <h2 class="mt-4 text-lg font-semibold text-slate-900">{{ doctor.name }}</h2>
    <p class="text-sm font-medium text-teal-700">{{ doctor.specialty }}</p>
    <p class="mt-3 text-slate-600">{{ doctor.bio }}</p>
  </article>
</template>
