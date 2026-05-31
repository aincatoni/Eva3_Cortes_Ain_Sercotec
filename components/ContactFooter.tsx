import Image from 'next/image'

import {type HomeData} from '@/sanity/lib/queries'

import {getMapEmbedUrl} from '@/lib/landing'

type ContactFooterProps = {
  contactInfo: HomeData['contactInfo']
  footerNote?: string
}

export function ContactFooter({contactInfo, footerNote}: ContactFooterProps) {
  return (
    <footer className='relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-[#091128] px-6 py-12 text-white sm:px-8 lg:px-12'>
      <div className='mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start'>
        <div>
          <p className='text-sm font-semibold uppercase tracking-[0.22em] text-[#8fc0f1]'>Contacto</p>
          <h2 className='mt-2 text-3xl font-semibold tracking-tight text-white'>{contactInfo.mainOfficeName}</h2>
          <div className='mt-6 space-y-4 text-sm leading-7 text-slate-300'>
            <p>
              <a className='transition hover:text-[#8fc0f1]' href={contactInfo.mapUrl} target='_blank' rel='noreferrer'>
                {contactInfo.address}
              </a>
            </p>
            <p>{contactInfo.phone}</p>
            <p>{contactInfo.email}</p>
            <p>{contactInfo.hours}</p>
          </div>
          <div className='mt-6 flex flex-wrap gap-3'>
            {contactInfo.socialLinks.map((link) => (
              <a
                key={link._key}
                className='rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:border-[#2469b4] hover:text-[#8fc0f1]'
                href={link.url}
                target='_blank'
                rel='noreferrer'
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className='mt-8 border-t border-white/10 pt-5'>
            <Image
              src='/images/logo-sercotec-footer.png'
              alt='Sercotec'
              width={210}
              height={123}
              className='h-auto w-[10.5rem] sm:w-[12rem]'
            />
          </div>
          {footerNote ? <p className='mt-8 max-w-xl text-sm leading-7 text-slate-400'>{footerNote}</p> : null}
        </div>

        <div>
          <div className='overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-100 shadow-[0_24px_70px_rgba(2,6,23,0.35)]'>
            <iframe
              title='Mapa de ubicacion del Centro de Desarrollo de Negocios Sercotec Santiago'
              src={getMapEmbedUrl(contactInfo.address)}
              className='h-[22rem] w-full border-0'
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            />
          </div>
        </div>
      </div>

      <div className='mx-auto mt-10 w-full max-w-7xl border-t border-white/10 pt-6 text-center text-sm text-slate-400'>
        <p>Hecho con ❤️ por Ain Cortés Catoni</p>
      </div>
    </footer>
  )
}
