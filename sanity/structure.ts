import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .title('Hero')
        .id('hero')
        .child(S.document().schemaType('hero').documentId('hero')),
      S.listItem()
        .title('Nosotros')
        .id('aboutSection')
        .child(S.document().schemaType('aboutSection').documentId('aboutSection')),
      S.listItem()
        .title('Contacto principal')
        .id('contactInfo')
        .child(S.document().schemaType('contactInfo').documentId('contactInfo')),
      S.listItem()
        .title('Configuracion del sitio')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('service').title('Servicios'),
      S.documentTypeListItem('testimonial').title('Testimonios'),
      S.documentTypeListItem('faq').title('Preguntas frecuentes'),
      S.documentTypeListItem('locationPoint').title('Puntos de atencion'),
    ])
