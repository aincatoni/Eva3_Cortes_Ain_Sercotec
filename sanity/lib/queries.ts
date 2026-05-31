import {defineQuery} from 'next-sanity'

export const homeQuery = defineQuery(`{
  "siteSettings": *[_type == "siteSettings"][0]{
    siteTitle,
    navigationLabel,
    navCtaLabel,
    navCtaTarget,
    footerNote,
    logo{
      alt,
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {width, height}
        }
      }
    }
  },
  "hero": *[_type == "hero"][0]{
    eyebrow,
    title,
    subtitle,
    primaryCtaLabel,
    primaryCtaTarget,
    secondaryCtaLabel,
    secondaryCtaTarget,
    image{
      alt,
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {width, height}
        }
      }
    }
  },
  "aboutSection": *[_type == "aboutSection"][0]{
    title,
    intro,
    paragraphOne,
    paragraphTwo,
    stats[]{
      _key,
      value,
      label
    },
    image{
      alt,
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {width, height}
        }
      }
    }
  },
  "services": *[_type == "service"] | order(order asc){
    _id,
    title,
    description,
    contactValue,
    image{
      alt,
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {width, height}
        }
      }
    }
  },
  "testimonials": *[_type == "testimonial"] | order(order asc){
    _id,
    name,
    business,
    commune,
    quote,
    sourceLabel,
    image{
      alt,
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {width, height}
        }
      }
    }
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
    mapUrl,
    socialLinks[]{
      _key,
      platform,
      label,
      url
    }
  },
  "locationPoints": *[_type == "locationPoint"] | order(order asc){
    _id,
    name,
    type,
    commune,
    address,
    schedule,
    contactPerson
  }
}`)

export type SanityImageData = {
  alt?: string
  asset?: {
    _id: string
    url: string
    metadata?: {
      lqip?: string
      dimensions?: {
        width?: number
        height?: number
      }
    }
  }
} | null

export type HomeData = {
  siteSettings: {
    siteTitle: string
    navigationLabel?: string
    navCtaLabel?: string
    navCtaTarget?: string
    footerNote?: string
    logo?: SanityImageData
  }
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    primaryCtaLabel: string
    primaryCtaTarget: string
    secondaryCtaLabel?: string
    secondaryCtaTarget?: string
    image?: SanityImageData
  }
  aboutSection: {
    title: string
    intro: string
    paragraphOne: string
    paragraphTwo: string
    stats: Array<{
      _key: string
      value: string
      label: string
    }>
    image?: SanityImageData
  }
  services: Array<{
    _id: string
    title: string
    description: string
    contactValue: string
    image?: SanityImageData
  }>
  testimonials: Array<{
    _id: string
    name: string
    business: string
    commune?: string
    quote: string
    sourceLabel?: string
    image?: SanityImageData
  }>
  faqs: Array<{
    _id: string
    question: string
    answer: string
  }>
  contactInfo: {
    mainOfficeName: string
    address: string
    phone: string
    email: string
    hours: string
    mapUrl: string
    socialLinks: Array<{
      _key: string
      platform: string
      label: string
      url: string
    }>
  }
  locationPoints: Array<{
    _id: string
    name: string
    type: string
    commune: string
    address: string
    schedule: string
    contactPerson?: string
  }>
}
