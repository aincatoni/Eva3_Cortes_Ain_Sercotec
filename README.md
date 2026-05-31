# Evaluación 3 Desarrollo Frontend

## Enlaces principales

- Sitio desplegado en Vercel: `https://eva3-cortes-ain-sercotec.vercel.app`
- Sanity Studio publicado: `https://eva3-cortes-ain-sercotec.vercel.app/studio`
- Endpoint principal consumido por la home: `https://eva3-cortes-ain-sercotec.vercel.app/api/home`
- Endpoint de recepción del formulario: `https://eva3-cortes-ain-sercotec.vercel.app/api/contact`

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
- despliegue público del proyecto en `Vercel`

## Cómo revisar el proyecto

### 1. Sitio público

Abrir:

- `https://eva3-cortes-ain-sercotec.vercel.app`

Desde esa URL se puede revisar:

- despliegue público funcional
- integración con el CMS
- landing visual funcional
- flujo real del formulario de contacto

### 2. Studio CMS

Abrir:

- `https://eva3-cortes-ain-sercotec.vercel.app/studio`

El Studio permite revisar la estructura editorial y el contenido administrable.

Consideración importante:

- para entrar al Studio se requiere autenticación con `Sanity`
- si se desea acceso de revisión o edición, el usuario debe estar invitado como miembro del proyecto en `Sanity`

Si no se cuenta con acceso al Studio, igualmente se puede verificar el funcionamiento del CMS revisando el endpoint público y la landing desplegada.

### 3. Endpoint consumido

Abrir:

- `https://eva3-cortes-ain-sercotec.vercel.app/api/home`

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

## Estado actual del desarrollo

Estado implementado:

- proyecto desplegado en `Vercel`
- `Sanity Studio` integrado y publicado
- endpoint `/api/home` operativo
- endpoint `/api/contact` operativo
- landing visual funcional conectada a `Sanity`
- formulario conectado a `Supabase`
- modelado CMS ya definido para las secciones principales

Pendiente de siguiente iteración:

- terminar pulido visual final de la landing
- completar carga editorial final en `Sanity`
- agregar protección anti-bot al formulario
- construir panel admin para revisar solicitudes guardadas en `Supabase`
- reforzar accesibilidad y optimización responsive

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

SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
```

Notas importantes:

- `SUPABASE_SECRET_KEY` se usa solo en backend
- `SUPABASE_SECRET_KEY` nunca debe exponerse con prefijo `NEXT_PUBLIC_`
- `SUPABASE_PUBLISHABLE_KEY` quedó preparada para futuras integraciones cliente o panel admin si fuera necesario

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
3. enviar una solicitud desde el formulario y verificar que se persiste en `Supabase`
4. revisar `/studio` si se cuenta con acceso de `Sanity`

De esa forma se puede comprobar que el proyecto:

- está desplegado públicamente
- consume datos desde una API
- utiliza un CMS real
- guarda solicitudes en una base de datos real
- separa contenido, backend de integración, persistencia y frontend
