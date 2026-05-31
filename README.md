# Evaluación 3 Desarrollo Frontend

## Enlaces principales

- Sitio desplegado en Vercel: `https://eva3-cortes-ain-sercotec.vercel.app`
- Sanity Studio publicado: `https://eva3-cortes-ain-sercotec.vercel.app/studio`
- Endpoint principal consumido por la home: `https://eva3-cortes-ain-sercotec.vercel.app/api/home`

## Introducción

Este proyecto corresponde a la `Evaluación 3` de la asignatura de Desarrollo Frontend. El encargo consiste en rediseñar la experiencia inicial del sitio de referencia de `Sercotec`, transformándola en una landing page moderna, responsive, administrable desde un CMS y conectada a datos reales por medio de consumo de API.

La solución fue implementada con `Next.js`, `TypeScript`, `Tailwind CSS` y `Sanity` como CMS headless. El contenido se administra desde `Sanity Studio`, se expone mediante un endpoint propio en `Next.js` y luego se consume para pintar la interfaz pública.

## Qué se resolvió

- integración de `Sanity CMS` dentro del proyecto `Next.js`
- modelado editorial para `hero`, `nosotros`, `servicios`, `testimonios`, `faq`, `contacto`, `puntos de atención` y `configuración del sitio`
- publicación de `Sanity Studio` en la ruta `/studio`
- creación de un endpoint propio en `Next.js` para cumplir explícitamente con el requisito de consumo de API
- despliegue público del proyecto en `Vercel`

## Cómo revisar el proyecto

### 1. Sitio público

Abrir:

- `https://eva3-cortes-ain-sercotec.vercel.app`

Desde esa URL se puede revisar:

- despliegue público funcional
- consumo del endpoint interno
- integración con el CMS
- avance actual de la landing

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
- `services`
- `faqs`
- `contactInfo`

## Cómo se resuelve el requisito de consumo de endpoint

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

## Stack utilizado

- `Next.js`
- `React`
- `TypeScript`
- `Tailwind CSS`
- `Sanity`
- `Vercel`

## Estado actual del desarrollo

Estado implementado:

- proyecto desplegado en `Vercel`
- `Sanity Studio` integrado y publicado
- endpoint `/api/home` operativo
- contenido inicial ya cargado en `hero`
- modelado CMS ya definido para las secciones principales

Pendiente de siguiente iteración:

- completar carga de `servicios`, `faq`, `contacto`, `testimonios` y `puntos de atención`
- reemplazar la home técnica actual por la versión visual final de la landing
- incorporar formulario completo con validación y seguridad
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

## Observación para revisión docente

La forma más simple de revisar el cumplimiento técnico es esta:

1. abrir el sitio público en `Vercel`
2. abrir el endpoint `/api/home` y verificar el JSON
3. revisar `/studio` si se cuenta con acceso de `Sanity`

De esa forma se puede comprobar que el proyecto:

- está desplegado públicamente
- consume datos desde una API
- utiliza un CMS real
- separa contenido, backend de integración y frontend
