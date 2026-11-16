/**
 * Envía un formulario a Netlify Forms.
 * El formulario `formName` debe existir también como HTML estático en index.html
 * (con los mismos nombres de campo) para que Netlify lo detecte al hacer el deploy.
 */
export async function submitNetlifyForm(
  formName: string,
  fields: Record<string, string>,
): Promise<void> {
  const body = new URLSearchParams({ 'form-name': formName, ...fields })

  // En `npm run dev` no hay servidor de Netlify que reciba el envío: solo lo mostramos.
  // Para probar el envío real en local se puede usar `netlify dev`.
  if (import.meta.env.DEV) {
    console.info(`[Netlify Forms · dev] "${formName}" no se envía en desarrollo:`, fields)
    return
  }

  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  if (!response.ok) {
    throw new Error(`Netlify Forms respondió ${response.status}`)
  }
}
