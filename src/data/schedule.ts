import type { OpeningHours } from '@/types/booking'

// La clave es el día de la semana según Date.getDay(): 0 = domingo … 6 = sábado.
// null = cerrado.
export const SCHEDULE: Record<number, OpeningHours | null> = {
  0: null,
  1: { open: 9, close: 18 },
  2: { open: 9, close: 18 },
  3: { open: 9, close: 18 },
  4: { open: 9, close: 18 },
  5: { open: 9, close: 18 },
  6: { open: 9, close: 14 },
}
