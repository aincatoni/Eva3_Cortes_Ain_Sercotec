'use client'

import Image from 'next/image'
import {useEffect, useState} from 'react'

import {ServiceCard} from '@/components/ServiceCard'
import {type HomeData} from '@/sanity/lib/queries'

type HomeApiResponse = {
  source: string
  endpoint: string
  fetchedAt: string
  data: HomeData
  message?: string
  error?: string
}

type ContactFormValues = {
  name: string
  email: string
  service: string
  message: string
}

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

const initialFormValues: ContactFormValues = {
  name: '',
  email: '',
  service: '',
  message: '',
}

function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!values.name.trim()) {
    errors.name = 'Ingresa tu nombre.'
  } else if (values.name.trim().length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres.'
  }

  if (!values.email.trim()) {
    errors.email = 'Ingresa tu correo.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Ingresa un correo valido.'
  }

  if (!values.service) {
    errors.service = 'Selecciona un servicio.'
  }

  if (!values.message.trim()) {
    errors.message = 'Escribe un mensaje.'
  } else if (values.message.trim().length < 20) {
    errors.message = 'El mensaje debe tener al menos 20 caracteres.'
  }

  return errors
}

export default function Home() {
  const [payload, setPayload] = useState<HomeApiResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [formMessage, setFormMessage] = useState<string | null>(null)
  const [formValues, setFormValues] = useState<ContactFormValues>(initialFormValues)
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({})

  useEffect(() => {
    let cancelled = false

    async function loadHome() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/home')
        const json = (await response.json()) as HomeApiResponse

        if (!response.ok) {
          throw new Error(json.error || json.message || 'No se pudo cargar la home.')
        }

        if (!cancelled) {
          setPayload(json)
        }
      } catch (fetchError) {
        if (!cancelled) {
          setError(fetchError instanceof Error ? fetchError.message : 'Error desconocido')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadHome()

    return () => {
      cancelled = true
    }
  }, [])

  const hero = payload?.data.hero
  const siteSettings = payload?.data.siteSettings
  const aboutSection = payload?.data.aboutSection
  const services = payload?.data.services ?? []
  const testimonials = payload?.data.testimonials ?? []
  const faqs = payload?.data.faqs ?? []
  const contactInfo = payload?.data.contactInfo
  const locationPoints = payload?.data.locationPoints ?? []

  function handleServiceSelect(value: string) {
    setFormMessage(null)
    setFormValues((current) => ({...current, service: value}))
    setFormErrors((current) => ({...current, service: undefined}))
    document.getElementById('contacto-formulario')?.scrollIntoView({behavior: 'smooth', block: 'start'})
  }

  function handleFieldChange(field: keyof ContactFormValues, value: string) {
    setFormValues((current) => ({...current, [field]: value}))
    setFormErrors((current) => ({...current, [field]: undefined}))
    setFormMessage(null)
  }

  function handleFieldBlur(field: keyof ContactFormValues) {
    const nextErrors = validateContactForm(formValues)

    setFormErrors((current) => ({
      ...current,
      [field]: nextErrors[field],
    }))
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateContactForm(formValues)

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors)
      setFormMessage('Corrige los campos marcados antes de continuar.')
      return
    }

    setFormMessage(
      'La experiencia de contacto ya quedo preparada con servicio preseleccionado. El envio seguro se conectara en la siguiente iteracion del plan.'
    )
  }

  function getLocationTypeLabel(value: string) {
    if (value === 'main-office') return 'Centro principal'
    if (value === 'satellite-office') return 'Centro satelite'
    return 'Punto movil'
  }

  return (
    <main className="min-h-screen bg-[#f7f8f4] text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-[#f7f8f4]/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-10 lg:px-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-800">
              {hero?.eyebrow || 'Region Metropolitana'}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {siteSettings?.siteTitle || 'Centro de Desarrollo de Negocios Sercotec Santiago'}
            </p>
          </div>

          <nav aria-label={siteSettings?.navigationLabel || 'Menu principal'} className="hidden items-center gap-6 lg:flex">
            <a className="text-sm font-medium text-slate-700 transition hover:text-slate-950" href="#nosotros">
              Nosotros
            </a>
            <a className="text-sm font-medium text-slate-700 transition hover:text-slate-950" href="#servicios">
              Servicios
            </a>
            <a className="text-sm font-medium text-slate-700 transition hover:text-slate-950" href="#testimonios">
              Testimonios
            </a>
            <a className="text-sm font-medium text-slate-700 transition hover:text-slate-950" href="#faq">
              FAQ
            </a>
            <a className="text-sm font-medium text-slate-700 transition hover:text-slate-950" href="#contacto">
              Contacto
            </a>
          </nav>

          <a
            className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
            href={siteSettings?.navCtaTarget || '#contacto'}
          >
            {siteSettings?.navCtaLabel || 'Solicitar orientacion'}
          </a>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span className="rounded-full border border-cyan-800/15 bg-cyan-800/8 px-3 py-1 font-medium text-cyan-900">
            Consumo de endpoint activo
          </span>
          <code className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700">/api/home</code>
          {payload?.fetchedAt ? <span>Actualizado: {new Date(payload.fetchedAt).toLocaleString('es-CL')}</span> : null}
        </div>

        {loading ? (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <p className="text-lg font-medium text-slate-900">Cargando contenido desde el endpoint...</p>
          </div>
        ) : null}

        {error ? (
          <div className="rounded-[2rem] border border-rose-300 bg-rose-50 p-8 text-rose-950">
            <h1 className="text-2xl font-semibold">No pudimos cargar la home</h1>
            <p className="mt-3 text-sm text-rose-800">{error}</p>
            <p className="mt-6 text-sm text-rose-800">
              Revisa que exista contenido publicado en Sanity y prueba el endpoint en
              <span className="mx-1 font-semibold">/api/home</span>.
            </p>
          </div>
        ) : null}

        {!loading && !error ? (
          <>
            <section className="grid gap-8 overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white shadow-[0_40px_120px_rgba(15,23,42,0.08)] lg:grid-cols-[1.1fr_0.9fr]">
              <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-12">
                <div className="space-y-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-800">
                    {hero?.eyebrow}
                  </p>
                  <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance text-slate-950 sm:text-5xl lg:text-6xl">
                    {hero?.title}
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-slate-600">{hero?.subtitle}</p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    className="rounded-full bg-slate-950 px-6 py-3 font-medium text-white transition hover:bg-cyan-700"
                    href={hero?.primaryCtaTarget}
                  >
                    {hero?.primaryCtaLabel}
                  </a>
                  {hero?.secondaryCtaLabel && hero?.secondaryCtaTarget ? (
                    <a
                      className="rounded-full border border-slate-300 px-6 py-3 font-medium text-slate-900 transition hover:border-slate-950"
                      href={hero.secondaryCtaTarget}
                    >
                      {hero.secondaryCtaLabel}
                    </a>
                  ) : null}
                </div>

                <dl className="mt-10 grid gap-4 border-t border-slate-200 pt-6 text-sm text-slate-600 sm:grid-cols-3">
                  <div>
                    <dt className="text-slate-500">Fuente</dt>
                    <dd className="mt-1 font-semibold text-slate-950">{payload?.source}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Servicios visibles</dt>
                    <dd className="mt-1 font-semibold text-slate-950">{services.length}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Preguntas frecuentes</dt>
                    <dd className="mt-1 font-semibold text-slate-950">{faqs.length}</dd>
                  </div>
                </dl>
              </div>

              <div className="relative min-h-[320px] bg-slate-200">
                {hero?.image?.asset?.url ? (
                  <Image
                    src={hero.image.asset.url}
                    alt={hero.image.alt || hero.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.42))]" />
                <div className="absolute bottom-6 left-6 right-6 rounded-[1.5rem] border border-white/30 bg-white/85 p-5 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-900">
                    Cobertura territorial
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-950">Santiago y Providencia</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Acompanamiento cercano para micro y pequenas empresas, cooperativas y emprendimientos con foco en resultados reales.
                  </p>
                </div>
              </div>
            </section>

            <section id="nosotros" className="grid gap-8 rounded-[2rem] bg-[#0f172a] p-8 text-white shadow-[0_32px_110px_rgba(15,23,42,0.28)] lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-800">
                {aboutSection?.image?.asset?.url ? (
                  <Image
                    src={aboutSection.image.asset.url}
                    alt={aboutSection.image.alt || aboutSection.title}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,32,0.05),rgba(8,15,32,0.72))]" />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Nosotros</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{aboutSection?.title}</h2>
                <p className="mt-5 text-base leading-8 text-slate-200">{aboutSection?.intro}</p>
                <p className="mt-5 text-sm leading-7 text-slate-300">{aboutSection?.paragraphOne}</p>
                <p className="mt-4 text-sm leading-7 text-slate-300">{aboutSection?.paragraphTwo}</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {aboutSection?.stats.map((stat) => (
                    <article key={stat._key} className="rounded-[1.25rem] border border-white/10 bg-white/6 p-5">
                      <p className="text-2xl font-semibold text-white">{stat.value}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{stat.label}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section id="servicios" className="space-y-6">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-800">Servicios</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  Apoyo concreto para cada etapa del negocio
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  Cada tarjeta lleva al bloque de contacto con el interes de servicio ya preparado para la siguiente fase del formulario.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {services.map((service) => (
                  <ServiceCard key={service._id} service={service} onSelect={handleServiceSelect} />
                ))}
              </div>
            </section>

            <section id="testimonios" className="grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_26px_90px_rgba(15,23,42,0.08)] lg:grid-cols-[0.42fr_0.58fr] lg:p-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-800">Testimonios</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  Historias que refuerzan la propuesta de valor
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  Esta primera iteracion muestra testimonios adaptados para prototipo mientras se consolida el contenido editorial definitivo en el CMS.
                </p>
              </div>

              <div className="grid gap-4">
                {testimonials.map((testimonial) => (
                  <article
                    key={testimonial._id}
                    className="rounded-[1.5rem] border border-slate-200 bg-[#f8fafc] p-6"
                  >
                    <p className="text-base leading-8 text-slate-700">&ldquo;{testimonial.quote}&rdquo;</p>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
                      <div>
                        <p className="font-semibold text-slate-950">{testimonial.name}</p>
                        <p className="text-sm text-slate-600">
                          {testimonial.business}
                          {testimonial.commune ? ` · ${testimonial.commune}` : ''}
                        </p>
                      </div>
                      {testimonial.sourceLabel ? (
                        <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                          {testimonial.sourceLabel}
                        </span>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="faq" className="grid gap-6 lg:grid-cols-[0.48fr_0.52fr] lg:items-stretch">
              <div className="rounded-[2rem] bg-[linear-gradient(135deg,_rgba(8,47,73,1),_rgba(22,78,99,0.94))] p-8 text-white shadow-[0_28px_100px_rgba(12,74,110,0.28)] lg:flex lg:h-full lg:flex-col lg:justify-center">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-100">Preguntas frecuentes</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Respuestas claras para acelerar el primer contacto
                </h2>
                <p className="mt-4 text-base leading-8 text-cyan-50/85">
                  El bloque mantiene una estructura accesible usando elementos nativos para apertura y cierre de cada respuesta.
                </p>
              </div>

              <div className="space-y-4 lg:h-[34rem] lg:overflow-y-auto lg:pr-2">
                {faqs.map((faq) => (
                  <details
                    key={faq._id}
                    className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_16px_60px_rgba(15,23,42,0.06)]"
                  >
                    <summary className="cursor-pointer list-none text-base font-semibold text-slate-950 marker:hidden">
                      <span className="flex items-center justify-between gap-4">
                        <span>{faq.question}</span>
                        <span className="text-cyan-800 transition group-open:rotate-45">+</span>
                      </span>
                    </summary>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-800">Puntos de atencion</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  Presencia territorial para una orientacion mas cercana
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {locationPoints.map((point) => (
                  <article key={point._id} className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
                    <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-900">
                      {getLocationTypeLabel(point.type)}
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-slate-950">{point.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{point.address}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{point.schedule}</p>
                    <p className="mt-4 text-sm font-medium text-slate-900">Comuna: {point.commune}</p>
                    {point.contactPerson ? (
                      <p className="mt-2 text-sm text-slate-600">Responsable: {point.contactPerson}</p>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>

            <section id="contacto" className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
              <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-[0_34px_110px_rgba(15,23,42,0.24)]">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Contacto</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                  {contactInfo?.mainOfficeName}
                </h2>
                <div className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
                  <p>{contactInfo?.address}</p>
                  <p>{contactInfo?.phone}</p>
                  <p>{contactInfo?.email}</p>
                  <p>{contactInfo?.hours}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {contactInfo?.socialLinks.map((link) => (
                    <a
                      key={link._key}
                      className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <a
                  className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
                  href={contactInfo?.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver ubicacion
                </a>
              </div>

              <div
                id="contacto-formulario"
                className="min-w-0 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-800">Solicitud inicial</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                  Deja preparada tu orientacion
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Esta iteracion ya conecta los CTA de servicios con una seleccion previa dentro del bloque de contacto.
                </p>

                <form className="mt-8 grid gap-5" onSubmit={handleFormSubmit}>
                  <label className="grid min-w-0 gap-2 text-sm font-medium text-slate-900">
                    Nombre
                    <input
                      className={`w-full min-w-0 rounded-2xl border px-4 py-3 text-sm outline-none transition focus:border-cyan-700 ${
                        formErrors.name ? 'border-rose-500 bg-rose-50/60' : 'border-slate-300'
                      }`}
                      name="name"
                      value={formValues.name}
                      onChange={(event) => handleFieldChange('name', event.target.value)}
                      onBlur={() => handleFieldBlur('name')}
                      placeholder="Tu nombre"
                      aria-invalid={formErrors.name ? 'true' : 'false'}
                      aria-describedby={formErrors.name ? 'contact-name-error' : undefined}
                      required
                    />
                    <span
                      id={formErrors.name ? 'contact-name-error' : undefined}
                      className={`min-h-5 text-sm font-medium ${
                        formErrors.name ? 'text-rose-700' : 'text-transparent'
                      }`}
                    >
                      {formErrors.name || ' '}
                    </span>
                  </label>

                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="grid min-w-0 auto-rows-min gap-2 text-sm font-medium text-slate-900">
                      Correo
                      <input
                        className={`w-full min-w-0 rounded-2xl border px-4 py-3 text-sm outline-none transition focus:border-cyan-700 ${
                          formErrors.email ? 'border-rose-500 bg-rose-50/60' : 'border-slate-300'
                        }`}
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={(event) => handleFieldChange('email', event.target.value)}
                        onBlur={() => handleFieldBlur('email')}
                        placeholder="nombre@correo.cl"
                        aria-invalid={formErrors.email ? 'true' : 'false'}
                        aria-describedby={formErrors.email ? 'contact-email-error' : undefined}
                        required
                      />
                      <span
                        id={formErrors.email ? 'contact-email-error' : undefined}
                        className={`min-h-5 text-sm font-medium ${
                          formErrors.email ? 'text-rose-700' : 'text-transparent'
                        }`}
                      >
                        {formErrors.email || ' '}
                      </span>
                    </label>

                    <label className="grid min-w-0 auto-rows-min gap-2 text-sm font-medium text-slate-900">
                      Servicio de interes
                      <select
                        className={`w-full min-w-0 rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-700 ${
                          formErrors.service ? 'border-rose-500 bg-rose-50/60' : 'border-slate-300'
                        }`}
                        name="service"
                        value={formValues.service}
                        onChange={(event) => handleFieldChange('service', event.target.value)}
                        onBlur={() => handleFieldBlur('service')}
                        aria-invalid={formErrors.service ? 'true' : 'false'}
                        aria-describedby={formErrors.service ? 'contact-service-error' : undefined}
                        required
                      >
                        <option value="">Selecciona un servicio</option>
                        {services.map((service) => (
                          <option key={service._id} value={service.contactValue}>
                            {service.contactValue}
                          </option>
                        ))}
                      </select>
                      <span
                        id={formErrors.service ? 'contact-service-error' : undefined}
                        className={`min-h-5 text-sm font-medium ${
                          formErrors.service ? 'text-rose-700' : 'text-transparent'
                        }`}
                      >
                        {formErrors.service || ' '}
                      </span>
                    </label>
                  </div>

                  <label className="grid min-w-0 gap-2 text-sm font-medium text-slate-900">
                    Mensaje
                    <textarea
                      className={`min-h-32 w-full min-w-0 rounded-[1.5rem] border px-4 py-3 text-sm outline-none transition focus:border-cyan-700 ${
                        formErrors.message ? 'border-rose-500 bg-rose-50/60' : 'border-slate-300'
                      }`}
                      name="message"
                      value={formValues.message}
                      onChange={(event) => handleFieldChange('message', event.target.value)}
                      onBlur={() => handleFieldBlur('message')}
                      placeholder="Cuéntanos brevemente qué necesitas potenciar en tu negocio."
                      aria-invalid={formErrors.message ? 'true' : 'false'}
                      aria-describedby={formErrors.message ? 'contact-message-error' : undefined}
                      required
                    />
                    <span
                      id={formErrors.message ? 'contact-message-error' : undefined}
                      className={`min-h-5 text-sm font-medium ${
                        formErrors.message ? 'text-rose-700' : 'text-transparent'
                      }`}
                    >
                      {formErrors.message || ' '}
                    </span>
                  </label>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <button
                      className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
                      type="submit"
                    >
                      Preparar solicitud
                    </button>
                    {formValues.service ? (
                      <span className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-950">
                        Servicio seleccionado: {formValues.service}
                      </span>
                    ) : null}
                  </div>

                  {formMessage ? (
                    <p
                      className={`text-sm leading-7 ${
                        Object.keys(formErrors).length > 0 ? 'text-rose-700' : 'text-slate-600'
                      }`}
                    >
                      {formMessage}
                    </p>
                  ) : null}
                </form>
              </div>
            </section>

            <footer className="rounded-[2rem] border border-slate-200 bg-white px-6 py-8 text-sm text-slate-600 shadow-[0_18px_70px_rgba(15,23,42,0.06)] sm:px-8">
              <p className="font-semibold text-slate-950">{siteSettings?.siteTitle}</p>
              <p className="mt-2 max-w-3xl leading-7">{siteSettings?.footerNote}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-slate-500">
                Endpoint consumido: {payload?.endpoint}
              </p>
            </footer>
          </>
        ) : null}
      </section>
    </main>
  )
}
