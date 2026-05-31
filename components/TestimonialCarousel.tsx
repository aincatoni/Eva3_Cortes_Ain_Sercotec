'use client'

import Image from 'next/image'
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
      <div className='min-w-0 overflow-hidden'>
        <div
          className='flex transition-transform duration-500 ease-out'
          style={{transform: `translateX(-${currentIndex * 100}%)`}}
        >
          {testimonials.map((testimonial) => (
            <article key={testimonial._id} className='min-w-0 w-full shrink-0 px-1'>
              <div className='min-w-0 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] md:grid md:grid-cols-[18rem_minmax(0,1fr)]'>
                <div className='relative min-h-[15rem] bg-slate-100 md:min-h-[18rem]'>
                  {testimonial.image?.asset?.url ? (
                    <Image
                      src={testimonial.image.asset.url}
                      alt={testimonial.image.alt || testimonial.name}
                      fill
                      sizes='(min-width: 1024px) 22vw, 100vw'
                      className='object-cover object-top'
                    />
                  ) : (
                    <div className='flex h-full min-h-[15rem] items-end bg-[linear-gradient(135deg,_rgba(9,17,40,1),_rgba(36,105,180,0.92))] p-6 text-white'>
                      <span className='max-w-[12rem] text-sm font-semibold uppercase tracking-[0.18em] text-[#d7eaff]'>
                        Testimonio del ecosistema emprendedor
                      </span>
                    </div>
                  )}
                </div>

                <div className='min-w-0 flex flex-col p-6'>
                  <p className='text-base leading-8 text-slate-700'>{testimonial.quote}</p>
                  <div className='mt-5 border-t border-slate-200 pt-4'>
                    <div className='min-w-0'>
                      <p className='font-semibold text-slate-950'>{testimonial.name}</p>
                      <p className='text-sm text-slate-600'>
                        {testimonial.business}
                        {testimonial.commune ? ` · ${testimonial.commune}` : ''}
                      </p>
                      {testimonial.sourceLabel ? (
                        <span className='mt-3 inline-flex max-w-full rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-600'>
                          {testimonial.sourceLabel}
                        </span>
                      ) : null}
                    </div>
                  </div>
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
