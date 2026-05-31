import Image from 'next/image'

import {type HomeData} from '@/sanity/lib/queries'

type SiteHeaderProps = {
  hero: HomeData['hero'] | undefined
  siteSettings: HomeData['siteSettings'] | undefined
}

export function SiteHeader({hero, siteSettings}: SiteHeaderProps) {
  return (
    <header className='sticky top-0 z-30 border-b border-slate-200/80 bg-[#f7f8f4]/90 backdrop-blur'>
      <div className='mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-10 lg:px-12'>
        <div className='flex min-w-0 items-center gap-4'>
          <Image
            src='/images/sercotec-centro-logo.png'
            alt='Centros de Negocios Sercotec'
            width={196}
            height={68}
            className='h-11 w-auto shrink-0 sm:h-12'
            priority
          />
          <div className='min-w-0'>
            <p className='text-xs font-semibold uppercase tracking-[0.26em] text-[#2469b4]'>
              {hero?.eyebrow || 'Region Metropolitana'}
            </p>
            <p className='mt-1 truncate text-sm font-semibold text-slate-900 sm:text-[0.95rem]'>
              {siteSettings?.siteTitle || 'Centro de Desarrollo de Negocios Sercotec Santiago'}
            </p>
          </div>
        </div>

        <nav aria-label={siteSettings?.navigationLabel || 'Menu principal'} className='hidden items-center gap-6 lg:flex'>
          <a className='text-sm font-medium text-slate-700 transition hover:text-[#2469b4]' href='#nosotros'>
            Nosotros
          </a>
          <a className='text-sm font-medium text-slate-700 transition hover:text-[#2469b4]' href='#servicios'>
            Servicios
          </a>
          <a className='text-sm font-medium text-slate-700 transition hover:text-[#2469b4]' href='#testimonios'>
            Testimonios
          </a>
          <a className='text-sm font-medium text-slate-700 transition hover:text-[#2469b4]' href='#puntos-atencion'>
            Sucursales
          </a>
          <a className='text-sm font-medium text-slate-700 transition hover:text-[#2469b4]' href='#faq'>
            FAQ
          </a>
          <a className='text-sm font-medium text-slate-700 transition hover:text-[#2469b4]' href='#contacto'>
            Contacto
          </a>
        </nav>

        <a
          className='inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2469b4]'
          href={siteSettings?.navCtaTarget || '#contacto'}
        >
          {siteSettings?.navCtaLabel || 'Solicitar orientacion'}
        </a>
      </div>
    </header>
  )
}
