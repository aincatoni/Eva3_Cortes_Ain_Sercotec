'use client'

import Image from 'next/image'
import {useState} from 'react'

import {type HomeData} from '@/sanity/lib/queries'

type SiteHeaderProps = {
  hero: HomeData['hero'] | undefined
  siteSettings: HomeData['siteSettings'] | undefined
}

export function SiteHeader({hero, siteSettings}: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navLabel = siteSettings?.navigationLabel || 'Menu principal'

  function handleCloseMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className='sticky top-0 z-30 border-b border-slate-200/80 bg-[#f7f8f4]/90 backdrop-blur'>
      <div className='mx-auto w-full max-w-7xl px-6 py-4 sm:px-10 lg:px-12'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex min-w-0 items-center gap-4'>
            <Image
              src='/images/logo-centro-negocios-sercotec.png'
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

          <nav aria-label={navLabel} className='hidden items-center gap-6 lg:flex'>
            <a className='text-sm font-medium text-slate-700 transition hover:text-[#2469b4]' href='#nosotros'>
              Nosotros
            </a>
            <a className='text-sm font-medium text-slate-700 transition hover:text-[#2469b4]' href='#servicios'>
              Servicios
            </a>
            <a className='text-sm font-medium text-slate-700 transition hover:text-[#2469b4]' href='#testimonios'>
              Testimonios
            </a>
            <a className='text-sm font-medium text-slate-700 transition hover:text-[#2469b4]' href='#faq'>
              FAQ
            </a>
            <a className='text-sm font-medium text-slate-700 transition hover:text-[#2469b4]' href='#puntos-atencion'>
              Sucursales
            </a>
            <a className='text-sm font-medium text-slate-700 transition hover:text-[#2469b4]' href='#contacto'>
              Contacto
            </a>
          </nav>

          <div className='flex items-center gap-3'>
            <button
              type='button'
              className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-950 transition hover:border-[#2469b4] hover:text-[#2469b4] lg:hidden'
              aria-expanded={isMenuOpen}
              aria-controls='mobile-site-menu'
              aria-label={isMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              <svg aria-hidden='true' viewBox='0 0 24 24' className='h-5 w-5' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
                {isMenuOpen ? (
                  <>
                    <path d='M6 6L18 18' />
                    <path d='M18 6L6 18' />
                  </>
                ) : (
                  <>
                    <path d='M4 7H20' />
                    <path d='M4 12H20' />
                    <path d='M4 17H20' />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen ? (
          <div id='mobile-site-menu' className='mt-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] lg:hidden'>
            <nav aria-label={`${navLabel} movil`} className='grid gap-2'>
              <a className='rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 transition hover:bg-[#eef5fd] hover:text-[#2469b4]' href='#nosotros' onClick={handleCloseMenu}>
                Nosotros
              </a>
              <a className='rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 transition hover:bg-[#eef5fd] hover:text-[#2469b4]' href='#servicios' onClick={handleCloseMenu}>
                Servicios
              </a>
              <a className='rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 transition hover:bg-[#eef5fd] hover:text-[#2469b4]' href='#testimonios' onClick={handleCloseMenu}>
                Testimonios
              </a>
              <a className='rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 transition hover:bg-[#eef5fd] hover:text-[#2469b4]' href='#faq' onClick={handleCloseMenu}>
                FAQ
              </a>
              <a className='rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 transition hover:bg-[#eef5fd] hover:text-[#2469b4]' href='#puntos-atencion' onClick={handleCloseMenu}>
                Sucursales
              </a>
              <a className='rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 transition hover:bg-[#eef5fd] hover:text-[#2469b4]' href='#contacto' onClick={handleCloseMenu}>
                Contacto
              </a>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  )
}
