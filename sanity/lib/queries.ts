export const homeQuery = `{
  "hero": *[_type == "hero"][0]{
    eyebrow,
    title,
    subtitle,
    primaryCtaLabel,
    primaryCtaTarget,
    secondaryCtaLabel,
    secondaryCtaTarget,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  },
  "services": *[_type == "service"] | order(order asc){
    _id,
    title,
    description,
    contactValue
  },
  "faqs": *[_type == "faq"] | order(order asc){
    _id,
    question,
    answer
  },
  "contactInfo": *[_type == "contactInfo"][0]{
    mainOfficeName,
    address,
    phone,
    email,
    hours,
    mapUrl
  }
}`

export type HomeData = {
  hero: {
    eyebrow?: string
    title?: string
    subtitle?: string
    primaryCtaLabel?: string
    primaryCtaTarget?: string
    secondaryCtaLabel?: string
    secondaryCtaTarget?: string
    imageUrl?: string
    imageAlt?: string
  } | null
  services: Array<{
    _id: string
    title: string
    description: string
    contactValue: string
  }>
  faqs: Array<{
    _id: string
    question: string
    answer: string
  }>
  contactInfo: {
    mainOfficeName?: string
    address?: string
    phone?: string
    email?: string
    hours?: string
    mapUrl?: string
  } | null
}
