export type ContactFormValues = {
  name: string
  email: string
  service: string
  message: string
}

export type ContactFormSubmission = ContactFormValues & {
  website?: string
  startedAt?: number
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

export const MIN_FORM_COMPLETION_MS = 2500

export const initialContactFormValues: ContactFormValues = {
  name: '',
  email: '',
  service: '',
  message: '',
}

export function normalizeContactFormValues(values: ContactFormValues): ContactFormValues {
  return {
    name: values.name.trim(),
    email: values.email.trim().toLowerCase(),
    service: values.service.trim(),
    message: values.message.trim(),
  }
}

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const normalized = normalizeContactFormValues(values)
  const errors: ContactFormErrors = {}

  if (!normalized.name) {
    errors.name = 'Ingresa tu nombre.'
  } else if (normalized.name.length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres.'
  }

  if (!normalized.email) {
    errors.email = 'Ingresa tu correo.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) {
    errors.email = 'Ingresa un correo valido.'
  }

  if (!normalized.service) {
    errors.service = 'Selecciona un servicio.'
  }

  if (!normalized.message) {
    errors.message = 'Escribe un mensaje.'
  } else if (normalized.message.length < 20) {
    errors.message = 'El mensaje debe tener al menos 20 caracteres.'
  }

  return errors
}

export function isLikelyBotSubmission(payload: ContactFormSubmission, now = Date.now()) {
  const website = payload.website?.trim()

  if (website) {
    return true
  }

  if (typeof payload.startedAt !== 'number') {
    return true
  }

  return now - payload.startedAt < MIN_FORM_COMPLETION_MS
}
