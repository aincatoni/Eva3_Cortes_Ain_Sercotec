import {client} from './client'
import {type HomeData, homeQuery} from './queries'

const fallbackSiteSettings: HomeData['siteSettings'] = {
  siteTitle: 'Centro de Desarrollo de Negocios Sercotec Santiago',
  navigationLabel: 'Menu principal',
  navCtaLabel: 'Solicitar orientacion',
  navCtaTarget: '#contacto',
  footerNote:
    'Landing informativa y de contacto del Centro de Desarrollo de Negocios Sercotec Santiago, administrada desde Sanity CMS.',
}

const fallbackHero: HomeData['hero'] = {
  eyebrow: 'Region Metropolitana',
  title: 'Impulsamos el crecimiento de negocios en Santiago y Providencia',
  subtitle:
    'Asesoria tecnica, capacitacion y acompanamiento sin costo para micro, pequenas empresas, cooperativas y emprendimientos con foco en resultados reales.',
  primaryCtaLabel: 'Solicitar orientacion',
  primaryCtaTarget: '#contacto',
  secondaryCtaLabel: 'Ver servicios',
  secondaryCtaTarget: '#servicios',
}

const fallbackAboutSection: HomeData['aboutSection'] = {
  title: 'Acompanamiento estrategico para negocios con foco territorial',
  intro:
    'Acompanamos a micro y pequenas empresas, cooperativas y emprendimientos de Santiago y Providencia con asesoria especializada, capacitacion y vinculacion estrategica.',
  paragraphOne:
    'El Centro de Desarrollo de Negocios Sercotec Santiago es un espacio de apoyo estrategico donde micro, pequenas empresas y cooperativas reciben asesoria tecnica, capacitacion y vinculacion personalizada y sin costo, a traves de un equipo experto con foco en resultados.',
  paragraphTwo:
    'Nuestro enfoque combina trabajo territorial, resultados medibles y acompanamiento personalizado para fortalecer la sostenibilidad y competitividad de cada negocio, desde la idea inicial hasta su escalamiento.',
  stats: [
    {
      _key: 'stat-1',
      value: '+140.000',
      label: 'empresas y emprendimientos en Santiago y Providencia',
    },
    {
      _key: 'stat-2',
      value: '+3.200',
      label: 'empresas atendidas directamente',
    },
    {
      _key: 'stat-3',
      value: '$22.450 MM',
      label: 'aumento de ventas logrado',
    },
    {
      _key: 'stat-4',
      value: '1.834',
      label: 'nuevos empleos generados',
    },
  ],
}

const fallbackServices: HomeData['services'] = [
  {
    _id: 'service-1',
    title: 'Diagnostico y plan de trabajo',
    description:
      'Evaluamos el estado actual del negocio y definimos una hoja de ruta con acciones concretas para avanzar.',
    contactValue: 'Diagnostico y plan de trabajo',
  },
  {
    _id: 'service-2',
    title: 'Asesoria tecnica especializada',
    description:
      'Acompanamiento personalizado para resolver desafios de gestion, crecimiento, formalizacion y productividad.',
    contactValue: 'Asesoria tecnica especializada',
  },
  {
    _id: 'service-3',
    title: 'Capacitacion para emprendedores y empresas',
    description:
      'Instancias formativas para fortalecer capacidades en administracion, estrategia y desarrollo comercial.',
    contactValue: 'Capacitacion para emprendedores y empresas',
  },
  {
    _id: 'service-4',
    title: 'Mentoria y acompanamiento',
    description:
      'Apoyo continuo durante distintas etapas del negocio, desde la idea hasta el escalamiento.',
    contactValue: 'Mentoria y acompanamiento',
  },
  {
    _id: 'service-5',
    title: 'Vinculacion con redes y aliados',
    description:
      'Conectamos negocios con instituciones, espacios de innovacion, redes de apoyo y oportunidades de desarrollo.',
    contactValue: 'Vinculacion con redes y aliados',
  },
  {
    _id: 'service-6',
    title: 'Acceso a orientacion empresarial rapida',
    description:
      'Resolvemos dudas generales de emprendimiento mediante instancias breves, practicas y enfocadas.',
    contactValue: 'Acceso a orientacion empresarial rapida',
  },
]

const fallbackTestimonials: HomeData['testimonials'] = [
  {
    _id: 'testimonial-1',
    name: 'Carolina Munoz',
    business: 'Emprendimiento de pasteleria',
    commune: 'Santiago',
    quote:
      'El acompanamiento del centro nos ayudo a ordenar el negocio, definir prioridades y tomar decisiones con mayor claridad para crecer.',
    sourceLabel: 'Testimonio adaptado para prototipo',
  },
  {
    _id: 'testimonial-2',
    name: 'Jorge Rivas',
    business: 'Servicios de mantencion',
    commune: 'Providencia',
    quote:
      'Recibimos orientacion concreta para mejorar nuestra gestion y proyectar nuevas oportunidades comerciales con una mirada mas estrategica.',
    sourceLabel: 'Testimonio adaptado para prototipo',
  },
  {
    _id: 'testimonial-3',
    name: 'Daniela Soto',
    business: 'Diseno y productos textiles',
    commune: 'Providencia',
    quote:
      'La asesoria fue cercana, practica y util para profesionalizar el emprendimiento y avanzar con una ruta de trabajo mas clara.',
    sourceLabel: 'Testimonio adaptado para prototipo',
  },
]

const fallbackFaqs: HomeData['faqs'] = [
  {
    _id: 'faq-1',
    question: '¿Quienes pueden acceder al centro?',
    answer:
      'Micro y pequenas empresas, cooperativas y emprendimientos de Santiago y Providencia que necesiten orientacion, asesoria y acompanamiento para fortalecer su desarrollo.',
  },
  {
    _id: 'faq-2',
    question: '¿La asesoria tiene costo?',
    answer:
      'No. El acompanamiento y la orientacion entregados por el centro se presentan como servicios sin costo para sus publicos objetivo.',
  },
  {
    _id: 'faq-3',
    question: '¿Que tipo de apoyo entrega el centro?',
    answer:
      'El centro entrega diagnostico, plan de trabajo, asesoria tecnica, capacitacion, mentoria y vinculacion con redes y actores del ecosistema.',
  },
  {
    _id: 'faq-4',
    question: '¿Donde se ubican?',
    answer:
      'La sede principal esta en Santiago y tambien existe atencion complementaria en Providencia, ademas de puntos moviles en instituciones del territorio.',
  },
  {
    _id: 'faq-5',
    question: '¿Como puedo solicitar orientacion?',
    answer:
      'Puedes solicitar orientacion a traves del formulario de contacto de la landing o por medio de los canales oficiales del centro.',
  },
]

const fallbackContactInfo: HomeData['contactInfo'] = {
  mainOfficeName: 'Centro de Desarrollo de Negocios Sercotec Santiago',
  address: 'Manuel Rodriguez Sur 749, Santiago (Metro Toesca)',
  phone: '+(56) 9 3927 5633',
  email: 'centro.santiago@centrossercotec.cl',
  hours: 'Lunes a Viernes de 9:00 a 18:00 hrs.',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Manuel+Rodriguez+Sur+749,+Santiago',
  socialLinks: [
    {
      _key: 'social-facebook',
      platform: 'facebook',
      label: 'Facebook',
      url: 'https://www.facebook.com/centrodnsantiago',
    },
    {
      _key: 'social-instagram',
      platform: 'instagram',
      label: 'Instagram',
      url: 'https://www.instagram.com/centrodnsantiago/',
    },
  ],
}

const fallbackLocationPoints: HomeData['locationPoints'] = [
  {
    _id: 'location-1',
    name: 'Centro principal Santiago',
    type: 'main-office',
    commune: 'Santiago',
    address: 'Manuel Rodriguez Sur 749, Santiago (Metro Toesca)',
    schedule: 'Lunes a Viernes de 9:00 a 18:00 hrs.',
    contactPerson: 'Christian Gacitua L.',
  },
  {
    _id: 'location-2',
    name: 'Centro satelite Providencia',
    type: 'satellite-office',
    commune: 'Providencia',
    address: 'Los Jesuitas 881, Providencia (primer piso)',
    schedule: 'Martes y jueves de 09:00 a 13:00 hrs.',
    contactPerson: 'Francisco Ramirez',
  },
  {
    _id: 'location-3',
    name: 'Punto movil Universidad Tecnologica Metropolitana',
    type: 'mobile-point',
    commune: 'Providencia',
    address: 'Dr. Hernan Alessandri 644, Providencia',
    schedule: '2 miercoles al mes de 09:00 a 13:00 hrs.',
    contactPerson: 'Pablo Andrewartha',
  },
  {
    _id: 'location-4',
    name: 'Punto movil Universidad Autonoma de Chile',
    type: 'mobile-point',
    commune: 'Providencia',
    address: 'Pedro de Valdivia 425, Providencia',
    schedule: '2 miercoles al mes de 09:00 a 13:00 hrs.',
    contactPerson: 'Tania Avillo',
  },
  {
    _id: 'location-5',
    name: 'Punto movil DUOC Alameda',
    type: 'mobile-point',
    commune: 'Santiago',
    address: 'Espana 8, Santiago',
    schedule: '2 jueves al mes de 09:00 a 13:00 hrs.',
    contactPerson: 'Mauricio Vargas',
  },
]

function normalizeAnchor(value: string | undefined, fallback: string) {
  const normalized = value?.trim()

  if (!normalized) {
    return fallback
  }

  return normalized.startsWith('#') ? normalized : fallback
}

export async function getHomeData(): Promise<HomeData> {
  const data = await client.fetch<Partial<HomeData>>(homeQuery)

  return {
    siteSettings: data.siteSettings ?? fallbackSiteSettings,
    hero: {
      ...fallbackHero,
      ...data.hero,
      primaryCtaTarget: normalizeAnchor(data.hero?.primaryCtaTarget, fallbackHero.primaryCtaTarget),
      secondaryCtaTarget: normalizeAnchor(
        data.hero?.secondaryCtaTarget,
        fallbackHero.secondaryCtaTarget ?? '#servicios'
      ),
    },
    aboutSection: {
      ...fallbackAboutSection,
      ...data.aboutSection,
      stats:
        data.aboutSection?.stats
          ?.filter((stat): stat is NonNullable<typeof stat> => Boolean(stat?.value && stat.label))
          .map((stat) => ({
            _key: stat._key,
            value: stat.value.trim(),
            label: stat.label.trim(),
          })) ?? fallbackAboutSection.stats,
    },
    services: data.services?.length ? data.services : fallbackServices,
    testimonials: data.testimonials?.length ? data.testimonials : fallbackTestimonials,
    faqs: data.faqs?.length ? data.faqs : fallbackFaqs,
    contactInfo: data.contactInfo
      ? {
          ...fallbackContactInfo,
          ...data.contactInfo,
          socialLinks: data.contactInfo.socialLinks?.length
            ? data.contactInfo.socialLinks
            : fallbackContactInfo.socialLinks,
        }
      : fallbackContactInfo,
    locationPoints: data.locationPoints?.length ? data.locationPoints : fallbackLocationPoints,
  }
}
