<script setup lang="ts">
import { BOOKING_LINK, NAV_LINKS, SITE_NAME } from '@/data/site'

const footerLinks = [...NAV_LINKS, BOOKING_LINK]
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-slate-200 bg-slate-50 text-sm text-slate-600">
    <div class="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2">
      <div>
        <p class="text-lg font-bold text-teal-700">{{ SITE_NAME }}</p>
        <p class="mt-2 max-w-sm">
          Tratamientos dentales para toda la familia, con atención cercana y tecnología moderna.
        </p>
      </div>

      <nav aria-label="Pie de página">
        <ul class="grid grid-cols-2 gap-2">
          <li v-for="link in footerLinks" :key="link.to">
            <RouterLink :to="link.to" class="hover:text-teal-700 hover:underline">
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>

    <div class="border-t border-slate-200">
      <div class="mx-auto max-w-6xl space-y-1 px-4 py-4">
        <p>
          <strong>Clínica ficticia:</strong> sitio de demostración creado como proyecto de
          portafolio. No ofrece servicios reales.
        </p>
        <p>
          © {{ year }} {{ SITE_NAME }} · Hecho por
          <a
            href="https://github.com/jaimev54"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium text-teal-700 hover:underline"
          >
            Jaime
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>
