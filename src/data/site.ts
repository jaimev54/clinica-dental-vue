import type { NavLink } from '@/types/site'

export const SITE_NAME = 'Clínica Dental Sonrisa'

// URL de producción (Netlify). Se usa para la URL canónica de cada página.
export const SITE_URL = 'https://clinica-dental-vue.netlify.app'

// Enlaces del menú principal. "Agendar cita" va aparte porque se muestra como botón destacado.
export const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Equipo', to: '/equipo' },
  { label: 'Contacto', to: '/contacto' },
]

export const BOOKING_LINK: NavLink = { label: 'Agendar cita', to: '/agendar-cita' }

// Datos de contacto ficticios (example.com es un dominio reservado para ejemplos).
export const CONTACT_INFO = {
  address: 'Av. Ejemplo 123, Col. Centro, Monterrey, N.L.',
  phone: '81 0000 0000',
  email: 'contacto@example.com',
}
