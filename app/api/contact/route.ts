import {normalizeContactFormValues, validateContactForm} from '@/lib/contact-form'
import {getSupabaseServerClient} from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

type ContactPayload = {
  name?: unknown
  email?: unknown
  service?: unknown
  message?: unknown
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload

    const values = normalizeContactFormValues({
      name: typeof payload.name === 'string' ? payload.name : '',
      email: typeof payload.email === 'string' ? payload.email : '',
      service: typeof payload.service === 'string' ? payload.service : '',
      message: typeof payload.message === 'string' ? payload.message : '',
    })

    const errors = validateContactForm(values)

    if (Object.keys(errors).length > 0) {
      return Response.json(
        {
          message: 'Corrige los campos marcados antes de continuar.',
          errors,
        },
        {status: 400}
      )
    }

    const supabase = getSupabaseServerClient()
    const {error} = await supabase.from('contact_requests').insert({
      name: values.name,
      email: values.email,
      service: values.service,
      message: values.message,
      status: 'new',
    })

    if (error) {
      throw error
    }

    return Response.json({
      message: 'Solicitud enviada correctamente. Te contactaremos pronto.',
    })
  } catch (error) {
    return Response.json(
      {
        message: 'No pudimos guardar tu solicitud. Intenta nuevamente.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      {status: 500}
    )
  }
}
