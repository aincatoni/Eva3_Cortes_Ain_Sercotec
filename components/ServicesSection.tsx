 'use client'

import {useState} from 'react'

import {ServiceCard} from '@/components/ServiceCard'
import {ServiceDetailModal} from '@/components/ServiceDetailModal'
import {type HomeData} from '@/sanity/lib/queries'

type ServicesSectionProps = {
  services: HomeData['services']
  onSelect: (value: string) => void
}

export function ServicesSection({services, onSelect}: ServicesSectionProps) {
  const [activeService, setActiveService] = useState<HomeData['services'][number] | null>(null)

  return (
    <section id='servicios' className='scroll-mt-28 space-y-6'>
      <div className='max-w-3xl'>
        <p className='text-sm font-semibold uppercase tracking-[0.22em] text-[#2469b4]'>Servicios</p>
        <h2 className='mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl'>Apoyo concreto para cada etapa del negocio</h2>
        <p className='mt-4 text-base leading-8 text-slate-600'>
          Cada tarjeta lleva al bloque de contacto con el interes de servicio ya preparado para la siguiente fase del formulario.
        </p>
      </div>

      <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} onSelect={onSelect} onOpenDetail={setActiveService} />
        ))}
      </div>

      {activeService ? <ServiceDetailModal service={activeService} onClose={() => setActiveService(null)} onSelect={onSelect} /> : null}
    </section>
  )
}
