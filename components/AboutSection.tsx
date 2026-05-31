import Image from 'next/image'

import {type HomeData} from '@/sanity/lib/queries'

type AboutSectionProps = {
  aboutSection: HomeData['aboutSection']
}

export function AboutSection({aboutSection}: AboutSectionProps) {
  return (
    <section id='nosotros' className='scroll-mt-28 grid gap-8 rounded-[2rem] bg-[#0f172a] p-8 text-white shadow-[0_32px_110px_rgba(15,23,42,0.28)] lg:grid-cols-[0.95fr_1.05fr] lg:p-10'>
      <div className='relative overflow-hidden rounded-[1.5rem] bg-slate-800'>
        {aboutSection.image?.asset?.url ? (
          <Image
            src={aboutSection.image.asset.url}
            alt={aboutSection.image.alt || aboutSection.title}
            fill
            sizes='(min-width: 1024px) 40vw, 100vw'
            className='object-cover'
          />
        ) : null}
        <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,32,0.05),rgba(8,15,32,0.72))]' />
      </div>

      <div>
        <p className='text-sm font-semibold uppercase tracking-[0.22em] text-[#8fc0f1]'>Nosotros</p>
        <h2 className='mt-3 text-3xl font-semibold tracking-tight sm:text-4xl'>{aboutSection.title}</h2>
        <p className='mt-5 text-base leading-8 text-slate-200'>{aboutSection.intro}</p>
        <p className='mt-5 text-sm leading-7 text-slate-300'>{aboutSection.paragraphOne}</p>
        <p className='mt-4 text-sm leading-7 text-slate-300'>{aboutSection.paragraphTwo}</p>

        <div className='mt-8 grid gap-4 sm:grid-cols-2'>
          {aboutSection.stats.map((stat) => (
            <article key={stat._key} className='rounded-[1.25rem] border border-white/10 bg-white/6 p-5'>
              <p className='text-2xl font-semibold text-white'>{stat.value}</p>
              <p className='mt-2 text-sm leading-6 text-slate-300'>{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
