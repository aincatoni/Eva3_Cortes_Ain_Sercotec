import {type HomeData} from '@/sanity/lib/queries'

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

      <div className='grid gap-4'>
        {testimonials.map((testimonial) => (
          <article key={testimonial._id} className='rounded-[1.5rem] border border-slate-200 bg-[#f8fafc] p-6'>
            <p className='text-base leading-8 text-slate-700'>&ldquo;{testimonial.quote}&rdquo;</p>
            <div className='mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4'>
              <div>
                <p className='font-semibold text-slate-950'>{testimonial.name}</p>
                <p className='text-sm text-slate-600'>
                  {testimonial.business}
                  {testimonial.commune ? ` · ${testimonial.commune}` : ''}
                </p>
              </div>
              {testimonial.sourceLabel ? (
                <span className='rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white'>
                  {testimonial.sourceLabel}
                </span>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
