import {defineField, defineType} from 'sanity'

export const contactInfoType = defineType({
  name: 'contactInfo',
  title: 'Contacto principal',
  type: 'document',
  fields: [
    defineField({
      name: 'mainOfficeName',
      title: 'Nombre de sede principal',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'address',
      title: 'Direccion',
      type: 'string',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'phone',
      title: 'Telefono',
      type: 'string',
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: 'email',
      title: 'Correo electronico',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'hours',
      title: 'Horario',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'mapUrl',
      title: 'Enlace de mapa',
      type: 'url',
      validation: (Rule) => Rule.required().uri({allowRelative: false, scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Redes sociales',
      type: 'array',
      of: [{type: 'socialLink'}],
    }),
  ],
  preview: {
    select: {
      title: 'mainOfficeName',
      subtitle: 'email',
    },
  },
})
