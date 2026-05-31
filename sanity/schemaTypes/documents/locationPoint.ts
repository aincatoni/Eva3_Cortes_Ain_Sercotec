import {defineField, defineType} from 'sanity'

export const locationPointType = defineType({
  name: 'locationPoint',
  title: 'Punto de atencion',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'type',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          {title: 'Centro principal', value: 'main-office'},
          {title: 'Centro satelite', value: 'satellite-office'},
          {title: 'Punto movil', value: 'mobile-point'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'commune',
      title: 'Comuna',
      type: 'string',
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: 'address',
      title: 'Direccion',
      type: 'string',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'schedule',
      title: 'Horario o atencion',
      type: 'string',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'contactPerson',
      title: 'Persona responsable',
      type: 'string',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1),
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
      subtitle: 'commune',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: subtitle ? `Comuna: ${subtitle}` : undefined,
      }
    },
  },
})
