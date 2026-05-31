'use client'

import Image from 'next/image'

import {type HomeData} from '@/sanity/lib/queries'

type ServiceCardProps = {
  service: HomeData['services'][number]
  onSelect: (value: string) => void
  onOpenDetail: (service: HomeData['services'][number]) => void
}

export function ServiceCard({service, onSelect, onOpenDetail}: ServiceCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(15,23,42,0.14)]">
      {service.image?.asset?.url ? (
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <Image
            src={service.image.asset.url}
            alt={service.image.alt || service.title}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="flex aspect-[4/3] items-end bg-[linear-gradient(135deg,_rgba(12,74,110,0.95),_rgba(15,118,110,0.8))] p-6 text-white">
          <span className="max-w-[14rem] text-sm font-medium uppercase tracking-[0.22em] text-[#d7eaff]">
            Servicio prioritario
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold tracking-tight text-slate-950">{service.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{service.description}</p>
        <div className='mt-6 flex flex-wrap gap-3'>
          <button
            type='button'
            onClick={() => onSelect(service.contactValue)}
            className='inline-flex w-fit items-center rounded-full bg-[#091128] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2469b4]'
          >
            Contactanos
          </button>
          <button
            type='button'
            onClick={() => onOpenDetail(service)}
            className='inline-flex w-fit items-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-[#2469b4] hover:text-[#2469b4]'
          >
            Ver mas
          </button>
        </div>
      </div>
    </article>
  )
}
