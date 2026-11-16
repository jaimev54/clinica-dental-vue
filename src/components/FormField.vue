<script setup lang="ts">
// Envuelve un campo de formulario: label + control (por slot) + mensaje de error.
// El control debe tener el mismo `id` y, si hay error, aria-describedby="<id>-error".
defineProps<{
  id: string
  label: string
  error?: string
  required?: boolean
}>()
</script>

<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-slate-800">
      {{ label }}
      <span v-if="required" class="text-red-700" aria-hidden="true">*</span>
    </label>
    <div class="mt-1">
      <slot />
    </div>
    <p v-if="error" :id="`${id}-error`" class="mt-1 text-sm text-red-700">{{ error }}</p>
  </div>
</template>
