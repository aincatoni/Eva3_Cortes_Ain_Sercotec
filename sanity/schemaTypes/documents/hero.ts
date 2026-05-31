import {defineField, defineType} from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Etiqueta superior',
      type: 'string',
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: 'title',
      title: 'Titulo',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'subtitle',
      title: 'Bajada',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(320),
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'Texto CTA principal',
      type: 'string',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: 'primaryCtaTarget',
      title: 'Destino CTA principal',
      type: 'string',
      description: 'Ejemplo: #contacto',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Texto CTA secundario',
      type: 'string',
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: 'secondaryCtaTarget',
      title: 'Destino CTA secundario',
      type: 'string',
      description: 'Ejemplo: #servicios',
      hidden: ({document}) => !document?.secondaryCtaLabel,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.secondaryCtaLabel && !value) {
            return 'Debes definir un destino para el CTA secundario.'
          }

          return true
        }),
    }),
    defineField({
      name: 'image',
      title: 'Imagen principal',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          validation: (Rule) => Rule.required().max(120),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'eyebrow',
      media: 'image',
    },
  },
})
