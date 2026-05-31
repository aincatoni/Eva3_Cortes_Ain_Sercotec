import {type HomeData} from '@/sanity/lib/queries'

type FaqSectionProps = {
  faqs: HomeData['faqs']
}

export function FaqSection({faqs}: FaqSectionProps) {
  return (
    <section id='faq' className='scroll-mt-28 grid gap-6 lg:grid-cols-[0.48fr_0.52fr] lg:items-stretch'>
      <div className='rounded-[2rem] bg-[#091128] p-8 text-white shadow-[0_28px_100px_rgba(12,74,110,0.28)] lg:flex lg:h-full lg:flex-col lg:justify-center'>
        <p className='text-sm font-semibold uppercase tracking-[0.22em] text-[#d7eaff]'>Preguntas frecuentes</p>
        <h2 className='mt-2 text-3xl font-semibold tracking-tight sm:text-4xl'>Respuestas claras para acelerar el primer contacto</h2>
        <p className='mt-4 text-base leading-8 text-[#e6f2ff]/85'>
          El bloque mantiene una estructura accesible usando elementos nativos para apertura y cierre de cada respuesta.
        </p>
      </div>

      <div className='space-y-4 lg:h-[34rem] lg:overflow-y-auto lg:pr-2'>
        {faqs.map((faq) => (
          <details key={faq._id} className='group rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_16px_60px_rgba(15,23,42,0.06)]'>
            <summary className='cursor-pointer list-none text-base font-semibold text-slate-950 marker:hidden'>
              <span className='flex items-center justify-between gap-4'>
                <span>{faq.question}</span>
                <span className='text-[#2469b4] transition group-open:rotate-45'>+</span>
              </span>
            </summary>
            <p className='mt-4 text-sm leading-7 text-slate-600'>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
