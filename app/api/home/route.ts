import {getHomeData} from '@/sanity/lib/home'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const data = await getHomeData()

    return Response.json({
      source: 'Sanity CMS via Next.js Route Handler',
      endpoint: '/api/home',
      fetchedAt: new Date().toISOString(),
      data,
    })
  } catch (error) {
    return Response.json(
      {
        source: 'Sanity CMS via Next.js Route Handler',
        endpoint: '/api/home',
        message: 'No se pudo obtener el contenido desde Sanity.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      {status: 500}
    )
  }
}
