import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { SITE_NAME, SITE_URL } from '@/data/site'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Inicio',
        description: 'Clínica dental en Monterrey: limpieza, ortodoncia, blanqueamiento y más.',
      },
    },
    {
      path: '/servicios',
      name: 'services',
      component: () => import('@/views/ServicesView.vue'),
      meta: {
        title: 'Servicios',
        description:
          'Conoce nuestros tratamientos dentales: limpieza, ortodoncia, blanqueamiento y más.',
      },
    },
    {
      path: '/equipo',
      name: 'team',
      component: () => import('@/views/TeamView.vue'),
      meta: {
        title: 'Equipo',
        description: 'Conoce a los especialistas de nuestra clínica dental.',
      },
    },
    {
      path: '/agendar-cita',
      name: 'booking',
      component: () => import('@/views/BookingView.vue'),
      meta: {
        title: 'Agendar cita',
        description: 'Agenda tu cita en línea: elige doctor, fecha y hora.',
      },
    },
    {
      path: '/contacto',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
      meta: {
        title: 'Contacto',
        description: 'Ubicación, horarios y formulario de contacto de la clínica.',
      },
    },
    {
      // Comodín: cualquier ruta que no coincida con las anteriores (como '**' en Angular).
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: {
        title: 'Página no encontrada',
        description: 'La página que buscas no existe.',
      },
    },
  ],
  // Al cambiar de página, vuelve arriba (o a la posición guardada al usar "atrás").
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? { top: 0 }
  },
})

// Título, meta description y URL canónica únicos por ruta (SEO).
router.afterEach((to) => {
  document.title = `${to.meta.title} | ${SITE_NAME}`
  document.querySelector('meta[name="description"]')?.setAttribute('content', to.meta.description)
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${SITE_URL}${to.path}`)
})

export default router
