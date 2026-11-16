import type { Doctor } from '@/types/doctor'

// Perfiles ficticios (sin fotos ni datos de personas reales).
export const DOCTORS: Doctor[] = [
  {
    id: 'ana-torres',
    name: 'Dra. Ana Torres',
    specialty: 'Odontología general',
    bio: 'Se enfoca en la prevención y en planes de tratamiento claros para toda la familia.',
  },
  {
    id: 'luis-medina',
    name: 'Dr. Luis Medina',
    specialty: 'Ortodoncia',
    bio: 'Trabaja con brackets y alineadores transparentes para corregir la posición de los dientes.',
  },
  {
    id: 'sofia-ramirez',
    name: 'Dra. Sofía Ramírez',
    specialty: 'Estética dental',
    bio: 'Realiza blanqueamientos y carillas buscando resultados naturales.',
  },
  {
    id: 'carlos-herrera',
    name: 'Dr. Carlos Herrera',
    specialty: 'Endodoncia',
    bio: 'Atiende tratamientos de conductos para conservar los dientes naturales.',
  },
]
