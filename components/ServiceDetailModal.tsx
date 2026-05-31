'use client'

import Image from 'next/image'
import {useEffect} from 'react'

import {type HomeData} from '@/sanity/lib/queries'

type ServiceDetailModalProps = {
  service: HomeData['services'][number]
  onClose: () => void
  onSelect: (value: string) => void
}

export function ServiceDetailModal({service, onClose, onSelect}: ServiceDetailModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  function handleContact() {
    onSelect(service.contactValue)
    onClose()
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm' onClick={onClose}>
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='service-detail-title'
        className='relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_120px_rgba(15,23,42,0.35)]'
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type='button'
          onClick={onClose}
          className='absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-950 transition hover:border-[#2469b4] hover:text-[#2469b4]'
          aria-label='Cerrar detalle del servicio'
        >
          ×
        </button>

        <div className='grid max-h-[90vh] overflow-y-auto lg:grid-cols-[0.95fr_1.05fr]'>
          <div className='relative min-h-[18rem] bg-slate-100 lg:min-h-full'>
            {service.image?.asset?.url ? (
              <Image
                src={service.image.asset.url}
                alt={service.image.alt || service.title}
                fill
                sizes='(min-width: 1024px) 45vw, 100vw'
                className='object-cover'
              />
            ) : (
              <div className='flex h-full min-h-[18rem] items-end bg-[linear-gradient(135deg,_rgba(12,74,110,0.95),_rgba(15,118,110,0.8))] p-8 text-white'>
                <span className='max-w-[16rem] text-base font-semibold leading-7 text-[#d7eaff]'>
                  Acompanamiento especializado del Centro de Negocios Sercotec Santiago
                </span>
              </div>
            )}
          </div>

          <div className='flex flex-col p-8 sm:p-10'>
            <p className='text-sm font-semibold uppercase tracking-[0.22em] text-[#2469b4]'>Detalle del servicio</p>
            <h3 id='service-detail-title' className='mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl'>
              {service.title}
            </h3>
            <p className='mt-5 text-base leading-8 text-slate-600'>{service.description}</p>

            <div className='mt-6 rounded-[1.5rem] bg-[#f8fafc] p-5 text-sm leading-7 text-slate-600'>
              <p>
                Este servicio forma parte del acompanamiento entregado por el Centro de Desarrollo de Negocios Sercotec Santiago para orientar, fortalecer y dar seguimiento a emprendimientos, micro y pequenas empresas.
              </p>
            </div>

            <div className='mt-8 flex flex-wrap gap-3'>
              <button
                type='button'
                onClick={handleContact}
                className='inline-flex rounded-full bg-[#091128] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2469b4]'
              >
                Contactanos por este servicio
              </button>
              <button
                type='button'
                onClick={onClose}
                className='inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-[#2469b4] hover:text-[#2469b4]'
              >
                Volver a la landing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
