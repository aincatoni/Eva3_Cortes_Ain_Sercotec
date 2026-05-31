import {LocationPointCard} from '@/components/LocationPointCard'
import {type HomeData} from '@/sanity/lib/queries'

type LocationPointsSectionProps = {
  locationPoints: HomeData['locationPoints']
}

export function LocationPointsSection({locationPoints}: LocationPointsSectionProps) {
  return (
    <section className='space-y-6'>
      <div className='max-w-3xl'>
        <p className='text-sm font-semibold uppercase tracking-[0.22em] text-[#2469b4]'>Puntos de atencion</p>
        <h2 className='mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl'>Presencia territorial para una orientacion mas cercana</h2>
      </div>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {locationPoints.map((point) => (
          <LocationPointCard key={point._id} point={point} />
        ))}
      </div>
    </section>
  )
}
