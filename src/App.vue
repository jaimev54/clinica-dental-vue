<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import SiteFooter from '@/components/SiteFooter.vue'
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
