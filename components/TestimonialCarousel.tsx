'use client'

import {useState} from 'react'

import {type HomeData} from '@/sanity/lib/queries'

type TestimonialCarouselProps = {
  testimonials: HomeData['testimonials']
}

export function TestimonialCarousel({testimonials}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const total = testimonials.length

  function goTo(index: number) {
    setCurrentIndex((index + total) % total)
  }

  function goPrevious() {
    goTo(currentIndex - 1)
  }

  function goNext() {
    goTo(currentIndex + 1)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goPrevious()
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goNext()
    }
  }

  return (
    <div
      className='rounded-[1.75rem] border border-slate-200 bg-[#f8fafc] p-4 sm:p-5'
      role='region'
      aria-label='Carrusel de testimonios'
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className='overflow-hidden'>
        <div
          className='flex transition-transform duration-500 ease-out'
          style={{transform: `translateX(-${currentIndex * 100}%)`}}
        >
          {testimonials.map((testimonial) => (
            <article key={testimonial._id} className='w-full shrink-0 px-1'>
              <div className='rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]'>
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
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className='mt-5 flex items-center justify-between gap-4'>
        <div className='flex items-center gap-2'>
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial._id}
              type='button'
              onClick={() => goTo(index)}
              className={`h-2.5 rounded-full transition ${index === currentIndex ? 'w-8 bg-[#2469b4]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`}
              aria-label={`Ir al testimonio ${index + 1}`}
              aria-pressed={index === currentIndex}
            />
          ))}
        </div>

        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={goPrevious}
            className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-900 transition hover:border-[#2469b4] hover:text-[#2469b4]'
            aria-label='Ver testimonio anterior'
          >
            ←
          </button>
          <button
            type='button'
            onClick={goNext}
            className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-900 transition hover:border-[#2469b4] hover:text-[#2469b4]'
            aria-label='Ver siguiente testimonio'
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}
