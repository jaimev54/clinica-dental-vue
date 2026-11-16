<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { BOOKING_LINK, NAV_LINKS, SITE_NAME } from '@/data/site'

// Estado del menú móvil (equivalente a signal(false) en Angular).
const isMenuOpen = ref(false)
const route = useRoute()

// Cierra el menú móvil al navegar a otra página.
watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false
  },
)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-slate-200 bg-white">
    <nav
      aria-label="Principal"
      class="mx-auto flex max-w-6xl flex-wrap items-center justify-between px-4 py-3"
    >
      <RouterLink to="/" class="text-xl font-bold text-teal-700">{{ SITE_NAME }}</RouterLink>

      <button
        type="button"
        class="rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
        aria-controls="main-menu"
        :aria-expanded="isMenuOpen"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span class="sr-only">{{ isMenuOpen ? 'Cerrar menú' : 'Abrir menú' }}</span>
        <svg
          class="size-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <path v-if="isMenuOpen" d="M6 6l12 12M18 6L6 18" />
          <path v-else d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <ul
        id="main-menu"
        :class="isMenuOpen ? 'flex' : 'hidden'"
        class="w-full flex-col gap-1 pt-3 md:flex md:w-auto md:flex-row md:items-center md:gap-6 md:pt-0"
      >
        <li v-for="link in NAV_LINKS" :key="link.to">
          <RouterLink
            :to="link.to"
            class="block rounded-md px-3 py-2 font-medium text-slate-700 hover:bg-slate-100 hover:text-teal-700 aria-[current=page]:text-teal-700 md:px-0 md:hover:bg-transparent"
          >
            {{ link.label }}
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="BOOKING_LINK.to"
            class="mt-2 block rounded-full bg-teal-700 px-5 py-2 text-center font-semibold text-white hover:bg-teal-800 md:mt-0"
          >
            {{ BOOKING_LINK.label }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
