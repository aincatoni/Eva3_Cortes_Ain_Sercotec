# Evaluación Unidad 3 Desarrollo Frontend

## Datos del estudiante

- Ain Cortés Catoni
- Sección 51
- Docente: Rodrigo Alejandro Matus Pezo

## Enlaces principales

- Sitio desplegado en Vercel: [https://eva3-cortes-ain-sercotec.vercel.app](https://eva3-cortes-ain-sercotec.vercel.app)
- Sanity Studio publicado: [https://eva3-cortes-ain-sercotec.vercel.app/studio](https://eva3-cortes-ain-sercotec.vercel.app/studio)
- Endpoint principal consumido por la home: [https://eva3-cortes-ain-sercotec.vercel.app/api/home](https://eva3-cortes-ain-sercotec.vercel.app/api/home)
- Endpoint de recepción del formulario: [https://eva3-cortes-ain-sercotec.vercel.app/api/contact](https://eva3-cortes-ain-sercotec.vercel.app/api/contact)

## Introducción

Este proyecto corresponde a la `Evaluación 3` de la asignatura de Desarrollo Frontend. El encargo consiste en rediseñar la experiencia inicial del sitio de referencia de `Sercotec`, transformándola en una landing page moderna, responsive, administrable desde un CMS y conectada a datos reales por medio de consumo de API.

La solución fue implementada con `Next.js`, `TypeScript`, `Tailwind CSS`, `Sanity` como CMS headless y `Supabase` como base de datos para almacenar las solicitudes enviadas desde el formulario de contacto. El contenido editorial se administra desde `Sanity Studio`, se expone mediante un endpoint propio en `Next.js` y luego se consume para pintar la interfaz pública. Las solicitudes del formulario se validan en cliente y servidor, y luego se guardan en `Supabase`.

## Qué se resolvió

- integración de `Sanity CMS` dentro del proyecto `Next.js`
- modelado editorial para `hero`, `nosotros`, `servicios`, `testimonios`, `faq`, `contacto`, `puntos de atención` y `configuración del sitio`
- publicación de `Sanity Studio` en la ruta `/studio`
- creación de endpoints propios en `Next.js` para contenido y formulario
- integración de `Supabase` para persistir solicitudes de contacto en la tabla `contact_requests`
- validación cliente/servidor del formulario de contacto
- protección anti-bot con `Cloudflare Turnstile`, honeypot y control de tiempo mínimo de envío
- refactor de la landing en componentes reutilizables por sección y por card
- navegación desktop y mobile por anclas dentro de la misma landing
- carrusel de testimonios accesible y responsive
- detalle ampliado de servicios mediante modal dentro de la landing
- despliegue público del proyecto en `Vercel`
- carga inicial de la home movida a renderizado en servidor para mejorar `LCP` y experiencia mobile

## Cómo revisar el proyecto

### 1. Sitio público

Abrir:

- [https://eva3-cortes-ain-sercotec.vercel.app](https://eva3-cortes-ain-sercotec.vercel.app)

Desde esa URL se puede revisar:

- despliegue público funcional
- integración con el CMS
- landing visual funcional
- landing componentizada en secciones reutilizables
- carrusel funcional de testimonios
- flujo real del formulario de contacto

### 2. Studio CMS

Abrir:

- [https://eva3-cortes-ain-sercotec.vercel.app/studio](https://eva3-cortes-ain-sercotec.vercel.app/studio)

El Studio permite revisar la estructura editorial y el contenido administrable.

Consideración importante:

- para entrar al Studio se requiere autenticación con `Sanity`
- si se desea acceso de revisión o edición, el usuario debe estar invitado como miembro del proyecto en `Sanity`

Si no se cuenta con acceso al Studio, igualmente se puede verificar el funcionamiento del CMS revisando el endpoint público y la landing desplegada.

### 3. Endpoint consumido

Abrir:

- [https://eva3-cortes-ain-sercotec.vercel.app/api/home](https://eva3-cortes-ain-sercotec.vercel.app/api/home)

Este endpoint devuelve un `JSON` generado por un `Route Handler` de `Next.js` y consulta contenido almacenado en `Sanity`.

Actualmente centraliza la información principal para la home, incluyendo:

- `hero`
- `siteSettings`
- `aboutSection`
- `services`
- `testimonials`
- `faqs`
- `contactInfo`
- `locationPoints`

### 4. Base de datos del formulario

El proyecto ahora cuenta con una base de datos real en `Supabase` para guardar los envíos del formulario de contacto.

Flujo de guardado:

1. el usuario completa el formulario en la landing
2. el cliente valida los campos mínimos requeridos
3. `Next.js` envía la solicitud a `POST /api/contact`
4. el servidor vuelve a validar los datos
5. la solicitud se inserta en `Supabase` dentro de la tabla `contact_requests`

Campos almacenados actualmente:

- `name`
- `email`
- `service`
- `message`
- `status`
- `created_at`

Esto deja lista la base para una futura pantalla administrativa de revisión y gestión de solicitudes.

Medidas anti-bot actuales:

- `Cloudflare Turnstile` con validación real en backend
- honeypot oculto
- validación de tiempo mínimo de completado del formulario

Estas medidas cubren protección concreta contra envíos automatizados y refuerzan el requisito de seguridad de la evaluación.

## Cómo se resuelve el requisito de consumo de endpoint y persistencia

Para que el consumo de API quede explícito en la evaluación, no se consulta `Sanity` solo de forma directa desde la vista. En cambio, se implementó una capa intermedia con un endpoint propio:

- `GET /api/home`

Flujo de datos:

1. el contenido se carga y administra en `Sanity`
2. `Next.js` consulta `Sanity` desde el servidor
3. el `Route Handler` expone `GET /api/home`
4. la home consume ese endpoint para renderizar la interfaz

Con esto se cubren simultáneamente:

- uso de CMS headless
- consumo de endpoint
- separación entre fuente de contenido y frontend

Para el formulario, el flujo técnico es distinto y complementario:

- `POST /api/contact`

Flujo de datos del formulario:

1. el usuario envía sus datos desde la landing
2. el cliente valida nombre, correo, servicio y mensaje
3. `Next.js` recibe la solicitud en el servidor
4. el servidor valida nuevamente
5. la solicitud se guarda en `Supabase`

Con esto se cubren simultáneamente:

- validación cliente/servidor
- persistencia real de datos
- separación entre interfaz pública y almacenamiento de solicitudes

## Stack utilizado

- `Next.js`
- `React`
- `TypeScript`
- `Tailwind CSS`
- `Sanity`
- `Supabase`
- `Vercel`

## Evidencia visual

### Landing y experiencia pública

![Landing principal](./docs/images/captura_cms.png)

![Vista adicional de la landing](./docs/images/SCR-20260530-upbo.png)

### CMS y administración de contenido

![Acceso a Sanity Studio](./docs/images/captura_cms_login.png)

![Sanity Studio con contenido](./docs/images/captura_cms_01.png)

![Sanity Studio con contenido adicional](./docs/images/captura_cms_02.png)

### Endpoint y persistencia

![Respuesta del endpoint principal](./docs/images/postman_api_home.png)

![Base de datos con registros del formulario](./docs/images/base_de_datos_con_dos_formularios.png)

## Componentización actual

La landing ya no vive como una sola vista monolítica. La estructura principal fue separada en componentes para alinearse con el foco de la evaluación.

Componentes principales actuales:

- `components/SiteHeader.tsx`
- `components/HeroSection.tsx`
- `components/AboutSection.tsx`
- `components/ServicesSection.tsx`
- `components/ServiceCard.tsx`
- `components/ServiceDetailModal.tsx`
- `components/TestimonialsSection.tsx`
- `components/TestimonialCarousel.tsx`
- `components/FaqSection.tsx`
- `components/LocationPointsSection.tsx`
- `components/LocationPointCard.tsx`
- `components/ContactFormSection.tsx`
- `components/ContactFooter.tsx`

Además, `app/page.tsx` ahora hace la carga inicial en servidor y delega la interactividad del formulario a `components/HomePageClient.tsx`.

## Uso de componentes

### `ServiceCard`

Responsabilidad:

- mostrar la imagen, título y descripción breve del servicio
- abrir el detalle del servicio en modal
- llevar al formulario con el servicio preseleccionado

Ejemplo de uso:

```tsx
<ServiceCard
  service={service}
  onSelect={handleServiceSelect}
  onOpenDetail={setSelectedService}
/>
```

### `TestimonialCarousel`

Responsabilidad:

- renderizar testimonios de forma responsive
- permitir navegación por botones e interacción con teclado usando flechas

Ejemplo de uso:

```tsx
<TestimonialCarousel testimonials={testimonials} />
```

### `ContactFormSection`

Responsabilidad:

- renderizar el formulario de contacto
- mostrar errores por campo y feedback general
- integrar `Turnstile` y enviar datos al endpoint interno

Ejemplo de uso:

```tsx
<ContactFormSection
  services={services}
  formValues={formValues}
  formErrors={formErrors}
  formMessage={formMessage}
  securityError={turnstileError}
  isSubmitting={isSubmitting}
  startedAt={formStartedAt}
  turnstileSiteKey={turnstileSiteKey}
  turnstileResetKey={turnstileResetKey}
  onSubmit={handleFormSubmit}
  onFieldChange={handleFieldChange}
  onFieldBlur={handleFieldBlur}
  onTurnstileTokenChange={handleTurnstileTokenChange}
/>
```

## Ejemplos de código

### Consumo del endpoint principal

La home obtiene su contenido desde el endpoint interno `GET /api/home`, que a su vez consulta `Sanity` desde el servidor.

```ts
const response = await fetch('/api/home')
const payload = await response.json()
```

### Envío del formulario

El formulario envía la solicitud al backend propio para validar y persistir en `Supabase`.

```ts
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name,
    email,
    service,
    message,
    turnstileToken,
  }),
})
```

## Estado actual del desarrollo

Estado implementado:

- proyecto desplegado en `Vercel`
- `Sanity Studio` integrado y publicado
- endpoint `/api/home` operativo
- endpoint `/api/contact` operativo
- landing visual funcional conectada a `Sanity`
- formulario conectado a `Supabase`
- `Cloudflare Turnstile` integrado y validado en cliente/servidor
- landing separada en componentes reutilizables
- menú mobile implementado
- carrusel de testimonios implementado
- modal de detalle en servicios implementado
- modelado CMS ya definido para las secciones principales
- mediciones Lighthouse generadas para desktop y mobile
- carga inicial optimizada con renderizado en servidor para reducir el costo de render en mobile

Lineas futuras no bloqueantes:

- construir panel admin para revisar solicitudes guardadas en `Supabase`
- seguir reforzando accesibilidad en detalles finos del modal y anuncios dinámicos

## Rendimiento y Lighthouse

Se dejó evidencia de rendimiento en formato `JSON`, `HTML` y capturas de pantalla.

Reportes base en desarrollo:

- `localhost_3000-informe_lighthouse_desktop.json`
- `localhost_3000-informe_lighthouse_mobile.json`

Reportes finales sobre producción en `Vercel`:

- `localhost_3000-informe_lighthouse_desktop_31_05_20-55_.json`
- `localhost_3000-informe_lighthouse_desktop_31_05_20-55_.html`
- `localhost_3000-informe_lighthouse_mobile_31_05_20-55_.json`
- `localhost_3000-informe_lighthouse_mobile_31_05_20-55_.html`

Capturas de apoyo:

- `docs/images/lighthouse-desktop.png`
- `docs/images/lighthouse-mobile.png`

![Lighthouse desktop](./docs/images/lighthouse-desktop.png)

![Lighthouse mobile](./docs/images/lighthouse-mobile.png)

Comparación de métricas relevantes:

- medición base `desktop`: `FCP 0.2 s`, `LCP 0.9 s`, `TBT 0 ms`, `CLS 0`
- medición final `desktop` en `Vercel`: `FCP 0.3 s`, `LCP 0.8 s`, `TBT 0 ms`, `CLS 0`
- medición base `mobile`: `FCP 0.8 s`, `LCP 6.9 s`, `TBT 210 ms`, `CLS 0`
- medición final `mobile` en `Vercel`: `FCP 2.1 s`, `LCP 2.1 s`, `TBT 0 ms`, `CLS 0`

Mejoras aplicadas para conseguirlo:

- la carga inicial de la home se movió a renderizado en servidor para que el contenido crítico no dependa del `fetch` cliente
- la interactividad del formulario quedó aislada en `HomePageClient`, evitando penalizar la primera pintura del contenido principal
- se mantuvo `next/image` en imágenes relevantes para optimización automática
- se corrigió el flujo de feedback del formulario para evitar bloqueos aparentes en el estado de envío
- se estabilizó la integración de `Turnstile` para que no se reinicializara durante los re-renderizados del formulario

Lectura final de rendimiento:

- `desktop` quedó en muy buen estado y se mantuvo estable
- `mobile` mejoró de forma importante en `LCP` y `TBT`, que eran los puntos más delicados detectados en la medición inicial

## Ejecución local

Instalar dependencias:

```bash
npm install
```

Levantar entorno local:

```bash
npm run dev
```

Rutas locales:

- sitio: `http://localhost:3000`
- studio: `http://localhost:3000/studio`
- endpoint: `http://localhost:3000/api/home`
- endpoint formulario: `http://localhost:3000/api/contact`

## Variables de entorno

El proyecto requiere variables para `Sanity` y para `Supabase`.

Variables principales usadas actualmente:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=

NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
```

Notas importantes:

- `SUPABASE_SECRET_KEY` se usa solo en backend
- `SUPABASE_SECRET_KEY` nunca debe exponerse con prefijo `NEXT_PUBLIC_`
- `SUPABASE_PUBLISHABLE_KEY` quedó preparada para futuras integraciones cliente o panel admin si fuera necesario

## Estructura general del proyecto

Directorios principales usados actualmente:

- `app/`: rutas públicas y rutas API
- `components/`: secciones, cards y piezas reutilizables de la landing
- `lib/`: validaciones, utilidades y helpers compartidos
- `sanity/`: cliente, queries y schemas del CMS
- `supabase/`: migraciones SQL de la base de datos de solicitudes

## Documentación adicional

Archivos de apoyo actualmente disponibles:

- `README.md`: visión general del proyecto e instalación
- `GUIA-BUENAS-PRACTICAS.md`: convenciones, accesibilidad, seguridad y estructura
- `RETROSPECTIVA.md`: cierre de iteración, aprendizajes y acciones siguientes

## Base de datos local / estructura SQL

La estructura actual para guardar solicitudes se encuentra en:

- `supabase/migrations/20260531_create_contact_requests.sql`

Tabla creada:

- `public.contact_requests`

Su propósito es almacenar y ordenar por fecha las solicitudes de orientación enviadas desde la landing.

## Observación para revisión docente

La forma más simple de revisar el cumplimiento técnico es esta:

1. abrir el sitio público en `Vercel`
2. abrir el endpoint `/api/home` y verificar el JSON
3. revisar el carrusel de testimonios y la navegación mobile
4. enviar una solicitud desde el formulario y verificar que se persiste en `Supabase`
5. revisar `/studio` si se cuenta con acceso de `Sanity`

De esa forma se puede comprobar que el proyecto:

- está desplegado públicamente
- consume datos desde una API
- utiliza un CMS real
- guarda solicitudes en una base de datos real
- incorpora interactividad avanzada en servicios, FAQ, navegación y testimonios
- separa contenido, backend de integración, persistencia y frontend
