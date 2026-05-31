import {defineField, defineType} from 'sanity'

export const statType = defineType({
  name: 'stat',
  title: 'Estadistica',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Valor',
      type: 'string',
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: 'label',
      title: 'Etiqueta',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
  ],
  preview: {
    select: {
      title: 'value',
      subtitle: 'label',
    },
  },
})
