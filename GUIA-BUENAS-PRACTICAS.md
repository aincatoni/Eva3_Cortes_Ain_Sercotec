# Guia de Buenas Practicas

## Objetivo

Este documento resume las decisiones y convenciones usadas en la landing del Centro de Desarrollo de Negocios Sercotec Santiago para mantener consistencia, accesibilidad, mantenibilidad y facilidad de administración.

## Framework y arquitectura

- `Next.js` se usa como framework principal para la interfaz, las rutas API y la integración entre frontend, CMS y base de datos.
- `Sanity` administra el contenido editorial.
- `Supabase` almacena las solicitudes enviadas desde el formulario de contacto.
- `app/page.tsx` debe priorizar renderizado inicial en servidor cuando el contenido principal impacta directamente el `LCP`.
- Las secciones de la landing se separan en componentes propios dentro de `components/`.
- La interactividad pesada o dependiente de estado debe aislarse en componentes cliente dedicados como `HomePageClient`.

## Estructura de archivos

- `app/`: rutas, vistas y route handlers.
- `components/`: componentes visuales reutilizables.
- `lib/`: validaciones, helpers y utilidades compartidas.
- `sanity/`: queries, cliente, schemas y utilidades del CMS.
- `supabase/`: migraciones SQL y estructura de datos para formularios.

## Convenciones de nomenclatura

- Componentes React: `PascalCase`.
  - ejemplo: `HeroSection`, `ContactFormSection`.
- Funciones y variables: `camelCase`.
  - ejemplo: `handleFormSubmit`, `getMapEmbedUrl`.
- Archivos de utilidades: nombres descriptivos y en minúsculas con guiones si corresponde.
  - ejemplo: `contact-form.ts`, `landing.ts`.
- Tipos: `PascalCase` con nombres explícitos.
  - ejemplo: `ContactFormValues`, `HomeData`.

## Componentización

- Cada bloque principal de la landing debe vivir en un componente dedicado.
- Las piezas reutilizables como cards, secciones o carousels deben extraerse cuando tengan estructura o comportamiento propio.
- Evitar componentes gigantes con demasiadas responsabilidades.
- Mantener la lógica de datos y la lógica visual separadas cuando sea posible.

## Variables de entorno

- Nunca exponer credenciales sensibles con prefijo `NEXT_PUBLIC_`.
- `SUPABASE_SECRET_KEY` debe usarse solo en backend.
- Mantener las variables documentadas en `README.md`.
- Verificar que producción y local usen nombres consistentes.

## Accesibilidad

- Usar jerarquía correcta de encabezados.
- Incluir `alt` descriptivo en imágenes relevantes.
- Mantener foco visible en inputs, botones y enlaces.
- Asociar mensajes de error con `aria-describedby` y `aria-invalid`.
- El formulario debe poder completarse con teclado.
- El menú mobile debe ser operable con teclado y con estados de apertura claros.
- Los sliders o carousels deben ofrecer controles visibles y navegación por teclado.

## Usabilidad

- CTA principales claros y ubicados en zonas de alta visibilidad.
- Formularios breves y directos.
- Navegación por anclas con compensación para el header sticky.
- Mensajes de éxito y error claros después de enviar el formulario.
- Mantener consistencia visual entre desktop y mobile.

## Consumo de datos

- El contenido visible de la landing se consume desde `GET /api/home`.
- El formulario no escribe directo desde el cliente a la base de datos.
- Toda inserción se realiza a través de `POST /api/contact`.
- La validación ocurre en cliente y servidor.

## Seguridad

- Validación cliente para feedback inmediato.
- Validación servidor para evitar datos inválidos.
- Uso de honeypot y control de tiempo mínimo de completado como primera barrera anti-bot.
- Las solicitudes se almacenan mediante backend usando credenciales privadas.
- No confiar en datos enviados desde el navegador sin normalización ni validación adicional.

## Rendimiento

- Usar `next/image` para imágenes cuando sea posible.
- Evitar cargar lógica innecesaria en la ruta principal.
- No depender de `fetch` cliente para renderizar el contenido crítico visible del primer pantallazo si existe una alternativa de renderizado en servidor.
- Extraer componentes para mejorar mantenibilidad sin sobrefragmentar.
- Revisar pesos de imágenes cargadas manualmente en `Sanity` o `public/`.
- Medir con `Lighthouse` en más de una etapa: base local y verificación final sobre producción.
- Guardar evidencia en `JSON`, `HTML` y capturas cuando la medición forme parte de la defensa del proyecto.

## Resultados observados en este proyecto

- la medición base mobile detectó `LCP 6.9 s` y `TBT 210 ms`
- tras mover la carga inicial de la home a servidor, la medición final en producción bajó a `LCP 2.1 s` y `TBT 0 ms`
- esto confirma que la arquitectura de render puede impactar más que ajustes cosméticos o microoptimizaciones

## Contenido administrable

- Los campos en `Sanity` deben tener nombres claros y propósito único.
- Las anclas internas guardadas en CTAs deben respetar IDs reales de la landing.
- Los editores deben poder actualizar secciones sin tocar código.

## Git y colaboración

- Crear ramas por funcionalidad cuando el flujo del repositorio lo permita.
- Hacer commits claros, pequeños y con intención concreta.
- Documentar cambios importantes en `README.md` y en el plan de trabajo externo.
- Evitar mezclar refactors estructurales con cambios funcionales grandes cuando no sea necesario.

## Recomendaciones para siguientes iteraciones

- construir panel admin para revisar solicitudes desde `Supabase`
- documentar retrospectiva del proceso en `RETROSPECTIVA.md`
- añadir ejemplos de uso de componentes al `README.md`
