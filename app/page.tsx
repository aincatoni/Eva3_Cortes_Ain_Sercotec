'use client'

import {useEffect, useState} from 'react'

import {type HomeData} from '@/sanity/lib/queries'

type HomeApiResponse = {
  source: string
  endpoint: string
  fetchedAt: string
  data: HomeData
  message?: string
  error?: string
}

export default function Home() {
  const [payload, setPayload] = useState<HomeApiResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

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
  const services = payload?.data.services ?? []
  const faqs = payload?.data.faqs ?? []
  const contactInfo = payload?.data.contactInfo

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 sm:px-10 lg:px-12">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-medium text-cyan-200">
            Endpoint activo
          </span>
          <code className="rounded-full border border-white/10 px-3 py-1">/api/home</code>
          {payload?.fetchedAt ? (
            <span>Actualizado: {new Date(payload.fetchedAt).toLocaleString('es-CL')}</span>
          ) : null}
        </div>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-lg font-medium">Cargando contenido desde el endpoint...</p>
          </div>
        ) : null}

        {error ? (
          <div className="rounded-3xl border border-rose-500/40 bg-rose-500/10 p-8 text-rose-100">
            <h1 className="text-2xl font-semibold">No pudimos cargar la home</h1>
            <p className="mt-3 text-sm text-rose-100/80">{error}</p>
            <p className="mt-6 text-sm text-rose-100/80">
              Revisa que exista contenido publicado en Sanity y prueba el endpoint en
              <span className="mx-1 font-semibold">/api/home</span>.
            </p>
          </div>
        ) : null}

        {!loading && !error ? (
          <>
            <section className="grid gap-8 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_30%),linear-gradient(135deg,_rgba(15,23,42,1),_rgba(30,41,59,0.94))] p-8 shadow-2xl shadow-cyan-950/30 lg:grid-cols-[1.3fr_0.7fr] lg:p-12">
              <div className="space-y-6">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
                  {hero?.eyebrow || 'Hero pendiente en Sanity'}
                </p>
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                  {hero?.title || 'Carga el documento Hero en /studio para ver la portada real.'}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-200/85">
                  {hero?.subtitle ||
                    'El sitio ya consume datos desde un endpoint propio de Next.js, que a su vez obtiene contenido desde Sanity.'}
                </p>
                <div className="flex flex-wrap gap-4">
                  {hero?.primaryCtaLabel && hero?.primaryCtaTarget ? (
                    <a
                      className="rounded-full bg-cyan-300 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-200"
                      href={hero.primaryCtaTarget}
                    >
                      {hero.primaryCtaLabel}
                    </a>
                  ) : null}
                  {hero?.secondaryCtaLabel && hero?.secondaryCtaTarget ? (
                    <a
                      className="rounded-full border border-white/15 px-5 py-3 font-medium text-white transition hover:bg-white/10"
                      href={hero.secondaryCtaTarget}
                    >
                      {hero.secondaryCtaLabel}
                    </a>
                  ) : null}
                </div>
              </div>

              <aside className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-6 backdrop-blur">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
                  Evidencia tecnica
                </h2>
                <dl className="mt-6 space-y-4 text-sm text-slate-200">
                  <div>
                    <dt className="text-slate-400">Fuente</dt>
                    <dd className="mt-1 font-medium">{payload?.source}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Servicios cargados</dt>
                    <dd className="mt-1 font-medium">{services.length}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">FAQs cargadas</dt>
                    <dd className="mt-1 font-medium">{faqs.length}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Contacto disponible</dt>
                    <dd className="mt-1 font-medium">{contactInfo?.email ? 'Si' : 'Pendiente'}</dd>
                  </div>
                </dl>
              </aside>
            </section>

            <section id="servicios" className="space-y-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
                    Desde el endpoint
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight">Servicios</h2>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {services.length > 0 ? (
                  services.map((service) => (
                    <article
                      key={service._id}
                      className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6"
                    >
                      <h3 className="text-xl font-semibold">{service.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{service.description}</p>
                      <p className="mt-5 text-sm font-medium text-cyan-200">
                        Valor de formulario: {service.contactValue}
                      </p>
                    </article>
                  ))
                ) : (
                  <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-white/5 p-6 text-slate-300 md:col-span-2 xl:col-span-3">
                    Aun no hay servicios publicados en Sanity.
                  </div>
                )}
              </div>
            </section>

            <section id="contacto" className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Contacto</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                  {contactInfo?.mainOfficeName || 'Contacto principal pendiente'}
                </h2>
                <div className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
                  <p>{contactInfo?.address || 'Carga la direccion en /studio.'}</p>
                  <p>{contactInfo?.phone || 'Carga el telefono en /studio.'}</p>
                  <p>{contactInfo?.email || 'Carga el correo en /studio.'}</p>
                  <p>{contactInfo?.hours || 'Carga el horario en /studio.'}</p>
                </div>
                {contactInfo?.mapUrl ? (
                  <a
                    className="mt-6 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                    href={contactInfo.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ver ubicacion
                  </a>
                ) : null}
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-slate-900 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
                  Preguntas frecuentes
                </p>
                <div className="mt-5 space-y-4">
                  {faqs.length > 0 ? (
                    faqs.map((faq) => (
                      <article key={faq._id} className="rounded-2xl border border-white/8 bg-white/5 p-5">
                        <h3 className="text-base font-semibold text-white">{faq.question}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-300">{faq.answer}</p>
                      </article>
                    ))
                  ) : (
                    <p className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-5 text-sm text-slate-300">
                      Aun no hay preguntas frecuentes publicadas en Sanity.
                    </p>
                  )}
                </div>
              </div>
            </section>
          </>
        ) : null}
      </section>
    </main>
  )
}
