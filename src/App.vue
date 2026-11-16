<script setup lang="ts">
import { nextTick } from 'vue'
import { START_LOCATION, useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import SiteFooter from '@/components/SiteFooter.vue'

// En una SPA el navegador no "recarga" la página, así que los lectores de pantalla
// no anuncian el cambio. Tras cada navegación movemos el foco al h1 de la nueva vista.
const router = useRouter()
router.afterEach(async (to, from) => {
  if (from === START_LOCATION || to.path === from.path) return
  await nextTick()
  const heading = document.querySelector<HTMLElement>('#main h1')
  if (!heading) return
  heading.setAttribute('tabindex', '-1')
  heading.focus({ preventScroll: true })
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-white text-slate-800">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-100 focus:rounded-md focus:bg-teal-700 focus:px-4 focus:py-2 focus:text-white"
    >
      Saltar al contenido
    </a>

    <NavBar />

    <main id="main" tabindex="-1" class="flex-1 focus:outline-none">
      <RouterView />
    </main>

    <SiteFooter />
  </div>
</template>
