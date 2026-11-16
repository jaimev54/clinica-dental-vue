export type ServiceCategory = 'preventiva' | 'estetica' | 'ortodoncia' | 'restauradora'

export interface Service {
  id: string
  name: string
  category: ServiceCategory
  description: string
  /** Se muestra en el resumen de la página de inicio. */
  featured: boolean
}
