import {defineField, defineType} from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonio',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'business',
      title: 'Negocio o rubro',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'commune',
      title: 'Comuna',
      type: 'string',
      validation: (Rule) => Rule.max(50),
    }),
    defineField({
      name: 'quote',
      title: 'Cita',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: 'sourceLabel',
      title: 'Etiqueta de fuente',
      type: 'string',
      description: 'Ejemplo: Testimonio adaptado para prototipo',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'URL de referencia',
      type: 'url',
      validation: (Rule) => Rule.uri({allowRelative: false, scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1),
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
  ],
  orderings: [
    {
      title: 'Orden ascendente',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'business',
      media: 'image',
    },
  },
})
