import {defineField, defineType} from 'sanity'

export const socialLinkType = defineType({
  name: 'socialLink',
  title: 'Enlace social',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Plataforma',
      type: 'string',
      options: {
        list: [
          {title: 'Facebook', value: 'facebook'},
          {title: 'Instagram', value: 'instagram'},
          {title: 'LinkedIn', value: 'linkedin'},
          {title: 'YouTube', value: 'youtube'},
          {title: 'Otro', value: 'other'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Texto visible',
      type: 'string',
      description: 'Nombre que se mostrara en la landing.',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({allowRelative: false, scheme: ['http', 'https']}),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'url',
    },
  },
})
