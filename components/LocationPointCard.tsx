import {type HomeData} from '@/sanity/lib/queries'

import {getLocationTypeLabel} from '@/lib/landing'

type LocationPointCardProps = {
  point: HomeData['locationPoints'][number]
}

export function LocationPointCard({point}: LocationPointCardProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(point.address)}`

  return (
    <article className='flex h-full min-h-[22rem] flex-col rounded-[1.5rem] border border-slate-200 bg-white p-6'>
      <span className='rounded-full bg-[#eef5fd] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#2469b4]'>
        {getLocationTypeLabel(point.type)}
      </span>
      <h3 className='mt-4 text-lg font-semibold text-slate-950'>{point.name}</h3>
      <p className='mt-3 text-sm leading-7 text-slate-600'>{point.address}</p>
      <p className='mt-3 text-sm leading-7 text-slate-600'>{point.schedule}</p>
      <p className='mt-4 text-sm font-medium text-slate-900'>Comuna: {point.commune}</p>
      {point.contactPerson ? <p className='mt-2 text-sm text-slate-600'>Responsable: {point.contactPerson}</p> : null}
      <a
        className='mt-auto inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 transition hover:border-[#2469b4] hover:text-[#2469b4]'
        href={googleMapsUrl}
        target='_blank'
        rel='noreferrer'
      >
        Ver en Google Maps
      </a>
    </article>
  )
}
