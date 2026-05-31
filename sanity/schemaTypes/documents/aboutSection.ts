import {defineField, defineType} from 'sanity'

export const aboutSectionType = defineType({
  name: 'aboutSection',
  title: 'Nosotros',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titulo',
      type: 'string',
      validation: (Rule) => Rule.required().max(90),
    }),
    defineField({
      name: 'intro',
      title: 'Introduccion breve',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: 'paragraphOne',
      title: 'Parrafo 1',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: 'paragraphTwo',
      title: 'Parrafo 2',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
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
      name: 'stats',
      title: 'Estadisticas',
      type: 'array',
      of: [{type: 'stat'}],
      validation: (Rule) => Rule.max(4),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
