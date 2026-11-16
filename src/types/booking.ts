/** Horario de un día, en horas enteras de 24 h. La clínica cierra a la hora `close`. */
export interface OpeningHours {
  open: number
  close: number
}

export interface BookingForm {
  name: string
  email: string
  phone: string
  service: string
  doctor: string
  date: string // formato YYYY-MM-DD, el que usa <input type="date">
  time: string // formato HH:MM
  notes: string
}

export type BookingField = keyof BookingForm
