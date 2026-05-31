import {type SchemaTypeDefinition} from 'sanity'

import {aboutSectionType} from './documents/aboutSection'
import {contactInfoType} from './documents/contactInfo'
import {faqType} from './documents/faq'
import {heroType} from './documents/hero'
import {locationPointType} from './documents/locationPoint'
import {serviceType} from './documents/service'
import {siteSettingsType} from './documents/siteSettings'
import {testimonialType} from './documents/testimonial'
import {socialLinkType} from './objects/socialLink'
import {statType} from './objects/stat'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    statType,
    socialLinkType,
    heroType,
    aboutSectionType,
    serviceType,
    testimonialType,
    faqType,
    contactInfoType,
    locationPointType,
    siteSettingsType,
  ],
}
