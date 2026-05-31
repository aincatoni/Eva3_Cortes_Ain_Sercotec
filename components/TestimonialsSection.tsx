import {type HomeData} from '@/sanity/lib/queries'

import {TestimonialCarousel} from '@/components/TestimonialCarousel'

type TestimonialsSectionProps = {
  testimonials: HomeData['testimonials']
}

export function TestimonialsSection({testimonials}: TestimonialsSectionProps) {
  return (
    <section id='testimonios' className='scroll-mt-28 grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_26px_90px_rgba(15,23,42,0.08)] lg:grid-cols-[0.42fr_0.58fr] lg:p-10'>
      <div>
        <p className='text-sm font-semibold uppercase tracking-[0.22em] text-[#2469b4]'>Testimonios</p>
        <h2 className='mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl'>Historias que refuerzan la propuesta de valor</h2>
        <p className='mt-4 text-base leading-8 text-slate-600'>
          Esta primera iteracion muestra testimonios adaptados para prototipo mientras se consolida el contenido editorial definitivo en el CMS.
        </p>
      </div>

      <TestimonialCarousel testimonials={testimonials} />
    </section>
  )
}
