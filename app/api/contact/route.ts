import {isLikelyBotSubmission, normalizeContactFormValues, validateContactForm} from '@/lib/contact-form'
import {getSupabaseServerClient} from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

type ContactPayload = {
  name?: unknown
  email?: unknown
  service?: unknown
  message?: unknown
  website?: unknown
  startedAt?: unknown
  turnstileToken?: unknown
}

type TurnstileVerifyResponse = {
  success: boolean
}

async function verifyTurnstileToken(token: string, ip?: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY

  if (!secret) {
    throw new Error('TURNSTILE_SECRET_KEY is not configured')
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  })

  if (ip) {
    body.set('remoteip', ip)
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
    signal: AbortSignal.timeout(10000),
  })

  if (!response.ok) {
    throw new Error('Turnstile verification request failed')
  }

  const result = (await response.json()) as TurnstileVerifyResponse
  return result.success
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload
    const turnstileToken = typeof payload.turnstileToken === 'string' ? payload.turnstileToken : ''

    const values = normalizeContactFormValues({
      name: typeof payload.name === 'string' ? payload.name : '',
      email: typeof payload.email === 'string' ? payload.email : '',
      service: typeof payload.service === 'string' ? payload.service : '',
      message: typeof payload.message === 'string' ? payload.message : '',
    })

    if (
      isLikelyBotSubmission({
        ...values,
        website: typeof payload.website === 'string' ? payload.website : '',
        startedAt: typeof payload.startedAt === 'number' ? payload.startedAt : undefined,
        turnstileToken,
      })
    ) {
      return Response.json(
        {
          message: 'No pudimos validar el envio. Intenta nuevamente.',
        },
        {status: 400}
      )
    }

    if (!turnstileToken) {
      return Response.json(
        {
          message: 'Completa la verificacion de seguridad antes de enviar.',
        },
        {status: 400}
      )
    }

    const turnstilePassed = await verifyTurnstileToken(turnstileToken, request.headers.get('x-forwarded-for'))

    if (!turnstilePassed) {
      return Response.json(
        {
          message: 'No pudimos validar la verificacion de seguridad. Intenta nuevamente.',
        },
        {status: 400}
      )
    }

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
