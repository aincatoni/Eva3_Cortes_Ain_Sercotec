import {client} from './client'
import {type HomeData, homeQuery} from './queries'

export async function getHomeData(): Promise<HomeData> {
  return client.fetch<HomeData>(homeQuery)
}
