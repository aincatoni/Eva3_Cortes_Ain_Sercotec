import {HomePageClient, type HomeApiResponse} from '@/components/HomePageClient'
import {getHomeData} from '@/sanity/lib/home'

export const revalidate = 60

export default async function Home() {
  let payload: HomeApiResponse | null = null
  let error: string | null = null

  try {
    const data = await getHomeData()

    payload = {
      source: 'Sanity CMS via server-rendered Next.js page',
      endpoint: '/api/home',
      fetchedAt: new Date().toISOString(),
      data,
    }
  } catch (fetchError) {
    error = fetchError instanceof Error ? fetchError.message : 'Error desconocido'
  }

  return <HomePageClient payload={payload} error={error} />
}
