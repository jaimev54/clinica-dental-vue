import type { NavLink } from '@/types/site'

export const SITE_NAME = 'Clínica Dental Sonrisa'

// Enlaces del menú principal. "Agendar cita" va aparte porque se muestra como botón destacado.
export const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Equipo', to: '/equipo' },
  { label: 'Contacto', to: '/contacto' },
]

export const BOOKING_LINK: NavLink = { label: 'Agendar cita', to: '/agendar-cita' }
