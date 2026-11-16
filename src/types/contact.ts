export interface ContactForm {
  name: string
  email: string
  message: string
}

export type ContactField = keyof ContactForm
