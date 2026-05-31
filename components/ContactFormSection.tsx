import {type FormEvent} from 'react'

import {type ContactFormErrors, type ContactFormValues} from '@/lib/contact-form'

type ContactFormSectionProps = {
  services: Array<{_id: string; contactValue: string}>
  formValues: ContactFormValues
  formErrors: ContactFormErrors
  formMessage: string | null
  isSubmitting: boolean
  startedAt: number
  onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>
  onFieldChange: (field: keyof ContactFormValues, value: string) => void
  onFieldBlur: (field: keyof ContactFormValues) => void
}

export function ContactFormSection({
  services,
  formValues,
  formErrors,
  formMessage,
  isSubmitting,
  startedAt,
  onSubmit,
  onFieldChange,
  onFieldBlur,
}: ContactFormSectionProps) {
  return (
    <section id='contacto' className='scroll-mt-28'>
      <div id='contacto-formulario' className='min-w-0 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]'>
        <p className='text-sm font-semibold uppercase tracking-[0.22em] text-[#2469b4]'>Solicitud inicial</p>
        <h2 className='mt-2 text-3xl font-semibold tracking-tight text-slate-950'>Deja preparada tu orientacion</h2>
        <p className='mt-4 text-sm leading-7 text-slate-600'>
          Completa tus datos y cuentanos brevemente que apoyo necesitas para que podamos orientarte mejor.
        </p>

        <form className='mt-8 grid gap-5' onSubmit={onSubmit}>
          <input type='hidden' name='startedAt' value={startedAt} />
          <label className='hidden' aria-hidden='true'>
            Sitio web
            <input type='text' name='website' tabIndex={-1} autoComplete='off' />
          </label>

          <label className='grid min-w-0 gap-2 text-sm font-medium text-slate-900'>
            Nombre
            <input
              className={`w-full min-w-0 rounded-2xl border px-4 py-3 text-sm outline-none transition focus:border-[#2469b4] ${
                formErrors.name ? 'border-rose-500 bg-rose-50/60' : 'border-slate-300'
              }`}
              name='name'
              value={formValues.name}
              onChange={(event) => onFieldChange('name', event.target.value)}
              onBlur={() => onFieldBlur('name')}
              placeholder='Tu nombre'
              aria-invalid={formErrors.name ? 'true' : 'false'}
              aria-describedby={formErrors.name ? 'contact-name-error' : undefined}
              required
            />
            <span id={formErrors.name ? 'contact-name-error' : undefined} className={`min-h-5 text-sm font-medium ${formErrors.name ? 'text-rose-700' : 'text-transparent'}`}>
              {formErrors.name || ' '}
            </span>
          </label>

          <div className='grid gap-5 md:grid-cols-2'>
            <label className='grid min-w-0 auto-rows-min gap-2 text-sm font-medium text-slate-900'>
              Correo
              <input
                className={`w-full min-w-0 rounded-2xl border px-4 py-3 text-sm outline-none transition focus:border-[#2469b4] ${
                  formErrors.email ? 'border-rose-500 bg-rose-50/60' : 'border-slate-300'
                }`}
                type='email'
                name='email'
                value={formValues.email}
                onChange={(event) => onFieldChange('email', event.target.value)}
                onBlur={() => onFieldBlur('email')}
                placeholder='nombre@correo.cl'
                aria-invalid={formErrors.email ? 'true' : 'false'}
                aria-describedby={formErrors.email ? 'contact-email-error' : undefined}
                required
              />
              <span id={formErrors.email ? 'contact-email-error' : undefined} className={`min-h-5 text-sm font-medium ${formErrors.email ? 'text-rose-700' : 'text-transparent'}`}>
                {formErrors.email || ' '}
              </span>
            </label>

            <label className='grid min-w-0 auto-rows-min gap-2 text-sm font-medium text-slate-900'>
              Servicio de interes
              <select
                className={`w-full min-w-0 rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-[#2469b4] ${
                  formErrors.service ? 'border-rose-500 bg-rose-50/60' : 'border-slate-300'
                }`}
                name='service'
                value={formValues.service}
                onChange={(event) => onFieldChange('service', event.target.value)}
                onBlur={() => onFieldBlur('service')}
                aria-invalid={formErrors.service ? 'true' : 'false'}
                aria-describedby={formErrors.service ? 'contact-service-error' : undefined}
                required
              >
                <option value=''>Selecciona un servicio</option>
                {services.map((service) => (
                  <option key={service._id} value={service.contactValue}>
                    {service.contactValue}
                  </option>
                ))}
              </select>
              <span id={formErrors.service ? 'contact-service-error' : undefined} className={`min-h-5 text-sm font-medium ${formErrors.service ? 'text-rose-700' : 'text-transparent'}`}>
                {formErrors.service || ' '}
              </span>
            </label>
          </div>

          <label className='grid min-w-0 gap-2 text-sm font-medium text-slate-900'>
            Mensaje
            <textarea
              className={`min-h-32 w-full min-w-0 rounded-[1.5rem] border px-4 py-3 text-sm outline-none transition focus:border-[#2469b4] ${
                formErrors.message ? 'border-rose-500 bg-rose-50/60' : 'border-slate-300'
              }`}
              name='message'
              value={formValues.message}
              onChange={(event) => onFieldChange('message', event.target.value)}
              onBlur={() => onFieldBlur('message')}
              placeholder='Cuéntanos brevemente qué necesitas potenciar en tu negocio.'
              aria-invalid={formErrors.message ? 'true' : 'false'}
              aria-describedby={formErrors.message ? 'contact-message-error' : undefined}
              required
            />
            <span id={formErrors.message ? 'contact-message-error' : undefined} className={`min-h-5 text-sm font-medium ${formErrors.message ? 'text-rose-700' : 'text-transparent'}`}>
              {formErrors.message || ' '}
            </span>
          </label>

          <div className='flex flex-wrap items-center justify-between gap-4'>
            <button
              className='rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2469b4] disabled:cursor-not-allowed disabled:opacity-60'
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Preparar solicitud'}
            </button>
            {formValues.service ? (
              <span className='rounded-full bg-[#eef5fd] px-4 py-2 text-sm font-medium text-[#2469b4]'>Servicio seleccionado: {formValues.service}</span>
            ) : null}
          </div>

          {formMessage ? (
            <p className={`text-sm leading-7 ${Object.keys(formErrors).length > 0 ? 'text-rose-700' : 'text-emerald-700'}`}>
              {formMessage}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}
