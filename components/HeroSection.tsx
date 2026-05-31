import Image from 'next/image'

import {type HomeData} from '@/sanity/lib/queries'

type HeroSectionProps = {
  hero: HomeData['hero']
}

export function HeroSection({hero}: HeroSectionProps) {
  return (
    <section className='grid gap-8 overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white shadow-[0_40px_120px_rgba(15,23,42,0.08)] lg:grid-cols-[1.1fr_0.9fr]'>
      <div className='flex flex-col justify-between p-8 sm:p-10 lg:p-12'>
        <div className='space-y-6'>
          <p className='text-sm font-semibold uppercase tracking-[0.24em] text-[#2469b4]'>{hero.eyebrow}</p>
          <h1 className='max-w-3xl text-4xl font-semibold tracking-tight text-balance text-slate-950 sm:text-5xl lg:text-6xl'>
            {hero.title}
          </h1>
          <p className='max-w-2xl text-lg leading-8 text-slate-600'>{hero.subtitle}</p>
        </div>

        <div className='mt-8 flex flex-wrap gap-4'>
          <a className='rounded-full bg-[#2469b4] px-6 py-3 font-medium text-white transition hover:bg-[#1f5b9c]' href={hero.primaryCtaTarget}>
            {hero.primaryCtaLabel}
          </a>
          {hero.secondaryCtaLabel && hero.secondaryCtaTarget ? (
            <a className='rounded-full border border-slate-300 px-6 py-3 font-medium text-slate-900 transition hover:border-slate-950' href={hero.secondaryCtaTarget}>
              {hero.secondaryCtaLabel}
            </a>
          ) : null}
        </div>

        <div className='mt-10 flex flex-wrap gap-3 border-t border-slate-200 pt-6 text-sm font-medium text-slate-600'>
          <span className='rounded-full bg-slate-100 px-4 py-2 text-slate-800'>Asesoria sin costo</span>
          <span className='rounded-full bg-slate-100 px-4 py-2 text-slate-800'>Cobertura Santiago y Providencia</span>
          <span className='rounded-full bg-slate-100 px-4 py-2 text-slate-800'>Acompanamiento especializado</span>
        </div>
      </div>

      <div className='relative min-h-[320px] bg-slate-200'>
        {hero.image?.asset?.url ? (
          <Image
            src={hero.image.asset.url}
            alt={hero.image.alt || hero.title}
            fill
            priority
            sizes='(min-width: 1024px) 45vw, 100vw'
            className='object-cover'
          />
        ) : null}
        <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.42))]' />
        <div className='absolute bottom-6 left-6 right-6 rounded-[1.5rem] border border-white/30 bg-white/85 p-5 backdrop-blur'>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-[#2469b4]'>Cobertura territorial</p>
          <p className='mt-2 text-base font-semibold text-slate-950'>Santiago y Providencia</p>
          <p className='mt-2 text-sm leading-6 text-slate-700'>
            Acompanamiento cercano para micro y pequenas empresas, cooperativas y emprendimientos con foco en resultados reales.
          </p>
        </div>
      </div>
    </section>
  )
}
