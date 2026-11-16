import { shallowRef, type ComputedRef } from 'vue'

export type FieldErrors<F extends string> = Partial<Record<F, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim())
}

interface Options<F extends string> {
  /** Errores actuales de cada campo (normalmente un computed). */
  errors: ComputedRef<FieldErrors<F>>
  /** Campos en el orden en que aparecen en pantalla. */
  fieldOrder: readonly F[]
  /** Prefijo de los ids de los inputs: `${idPrefix}-${campo}`. */
  idPrefix: string
}

/**
 * Lógica común de los formularios: cuándo mostrar cada error, ids y atributos
 * de accesibilidad, clases de los inputs y foco en el primer campo inválido.
 * Es el equivalente a un servicio de Angular, pero se importa y se llama sin inyección.
 */
export function useFormValidation<F extends string>({ errors, fieldOrder, idPrefix }: Options<F>) {
  const touched = shallowRef<ReadonlySet<F>>(new Set())
  const submitAttempted = shallowRef(false)

  function fieldId(field: F): string {
    return `${idPrefix}-${field}`
  }

  /** Marca el campo como visitado (se llama en @blur). */
  function touch(field: F): void {
    if (!touched.value.has(field)) touched.value = new Set(touched.value).add(field)
  }

  /** El error solo se muestra si el usuario ya salió del campo o intentó enviar. */
  function errorFor(field: F): string | undefined {
    return touched.value.has(field) || submitAttempted.value ? errors.value[field] : undefined
  }

  function describedBy(field: F): string | undefined {
    return errorFor(field) ? `${fieldId(field)}-error` : undefined
  }

  function inputClass(field: F): string {
    return [
      'block w-full rounded-lg border bg-white px-3 py-2 text-slate-900',
      'focus:border-teal-700 focus:ring-2 focus:ring-teal-700/30 focus:outline-none',
      'disabled:cursor-not-allowed disabled:bg-slate-100',
      errorFor(field) ? 'border-red-600' : 'border-slate-300',
    ].join(' ')
  }

  /** Muestra todos los errores; si hay alguno, enfoca el primero y devuelve false. */
  function validate(): boolean {
    submitAttempted.value = true
    const firstInvalid = fieldOrder.find((field) => errors.value[field])
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus()
      return false
    }
    return true
  }

  function reset(): void {
    touched.value = new Set()
    submitAttempted.value = false
  }

  return { fieldId, touch, errorFor, describedBy, inputClass, validate, reset }
}
