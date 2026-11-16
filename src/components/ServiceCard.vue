<script setup lang="ts">
import type { Service } from '@/types/service'
import { CATEGORY_LABELS } from '@/data/services'

defineProps<{ service: Service }>()
</script>

<template>
  <article class="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <p class="text-xs font-semibold tracking-wide text-teal-700 uppercase">
      {{ CATEGORY_LABELS[service.category] }}
    </p>
    <h3 class="mt-2 text-lg font-semibold text-slate-900">{{ service.name }}</h3>
    <p class="mt-2 text-slate-600">{{ service.description }}</p>
  </article>
</template>
