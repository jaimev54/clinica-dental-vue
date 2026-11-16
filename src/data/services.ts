import type { Service, ServiceCategory } from '@/types/service'

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  preventiva: 'Preventiva',
  estetica: 'Estética',
  ortodoncia: 'Ortodoncia',
  restauradora: 'Restauradora',
}

export const SERVICES: Service[] = [
  {
    id: 'limpieza',
    name: 'Limpieza dental',
    category: 'preventiva',
    description: 'Eliminamos sarro y placa para mantener tus dientes y encías sanos.',
    featured: true,
  },
  {
    id: 'revision',
    name: 'Revisión y diagnóstico',
    category: 'preventiva',
    description: 'Evaluación completa de tu salud bucal con un plan de tratamiento claro.',
    featured: false,
  },
  {
    id: 'blanqueamiento',
    name: 'Blanqueamiento',
    category: 'estetica',
    description: 'Aclara el tono de tus dientes de forma segura y supervisada.',
    featured: true,
  },
  {
    id: 'carillas',
    name: 'Carillas',
    category: 'estetica',
    description: 'Láminas delgadas que corrigen forma, color y pequeñas imperfecciones.',
    featured: false,
  },
  {
    id: 'brackets',
    name: 'Ortodoncia con brackets',
    category: 'ortodoncia',
    description:
      'Alineamos tus dientes y corregimos la mordida con brackets metálicos o estéticos.',
    featured: true,
  },
  {
    id: 'alineadores',
    name: 'Alineadores transparentes',
    category: 'ortodoncia',
    description: 'Ortodoncia casi invisible con alineadores removibles hechos a tu medida.',
    featured: false,
  },
  {
    id: 'resinas',
    name: 'Resinas',
    category: 'restauradora',
    description: 'Reparamos caries y fracturas con material del mismo color que tu diente.',
    featured: false,
  },
  {
    id: 'endodoncia',
    name: 'Endodoncia',
    category: 'restauradora',
    description: 'Tratamiento de conductos para salvar dientes con infección o daño profundo.',
    featured: true,
  },
]
