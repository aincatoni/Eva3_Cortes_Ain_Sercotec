import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Configuracion del sitio',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Nombre del sitio',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          validation: (Rule) => Rule.required().max(120),
        }),
      ],
    }),
    defineField({
      name: 'navigationLabel',
      title: 'Etiqueta del menu',
      type: 'string',
      description: 'Ejemplo: Menu principal',
      validation: (Rule) => Rule.max(50),
    }),
    defineField({
      name: 'navCtaLabel',
      title: 'Texto CTA menu',
      type: 'string',
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: 'navCtaTarget',
      title: 'Destino CTA menu',
      type: 'string',
      hidden: ({document}) => !document?.navCtaLabel,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.navCtaLabel && !value) {
            return 'Debes definir un destino para el CTA del menu.'
          }

          return true
        }),
    }),
    defineField({
      name: 'footerNote',
      title: 'Texto breve de footer',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
      media: 'logo',
    },
  },
})
