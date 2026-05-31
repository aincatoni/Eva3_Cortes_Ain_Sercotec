import Image from 'next/image'

import {type HomeData} from '@/sanity/lib/queries'

import {getMapEmbedUrl} from '@/lib/landing'

type ContactFooterProps = {
  contactInfo: HomeData['contactInfo']
  footerNote?: string
}

export function ContactFooter({contactInfo, footerNote}: ContactFooterProps) {
  return (
    <footer className='rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-[0_18px_70px_rgba(15,23,42,0.06)] sm:px-8'>
      <div className='grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start'>
        <div>
          <p className='text-sm font-semibold uppercase tracking-[0.22em] text-[#2469b4]'>Contacto</p>
          <h2 className='mt-2 text-3xl font-semibold tracking-tight text-slate-950'>{contactInfo.mainOfficeName}</h2>
          <div className='mt-6 space-y-4 text-sm leading-7 text-slate-600'>
            <p>{contactInfo.address}</p>
            <p>{contactInfo.phone}</p>
            <p>{contactInfo.email}</p>
            <p>{contactInfo.hours}</p>
          </div>
          <div className='mt-6 flex flex-wrap gap-3'>
            {contactInfo.socialLinks.map((link) => (
              <a
                key={link._key}
                className='rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 transition hover:border-[#2469b4] hover:text-[#2469b4]'
                href={link.url}
                target='_blank'
                rel='noreferrer'
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            className='mt-8 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2469b4]'
            href={contactInfo.mapUrl}
            target='_blank'
            rel='noreferrer'
          >
            Abrir en Google Maps
          </a>
          {footerNote ? <p className='mt-8 text-sm text-slate-600'>{footerNote}</p> : null}
        </div>

        <div className='space-y-4'>
          <div className='overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-100'>
            <iframe
              title='Mapa de ubicacion del Centro de Desarrollo de Negocios Sercotec Santiago'
              src={getMapEmbedUrl(contactInfo.address)}
              className='h-[22rem] w-full border-0'
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            />
          </div>

          <div className='flex justify-center rounded-[1.5rem] border border-slate-200 bg-[#091128] px-6 py-6'>
            <Image
              src='/images/logo-sercotec-footer.png'
              alt='Sercotec'
              width={210}
              height={123}
              className='h-auto w-[10.5rem] sm:w-[12rem]'
            />
          </div>
        </div>
      </div>

      <div className='mt-8 border-t border-slate-200 pt-6 text-center text-sm text-slate-600'>
        <p>Hecho con ❤️ por Ain Cortés Catoni</p>
      </div>
    </footer>
  )
}
