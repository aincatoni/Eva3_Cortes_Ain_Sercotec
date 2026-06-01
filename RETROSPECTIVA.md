# Retrospectiva de Iteración

## Contexto

Esta iteración cerró la base funcional de la landing del `Centro de Desarrollo de Negocios Sercotec Santiago` con `Next.js`, `Sanity`, `Supabase` y despliegue en `Vercel`.

## Qué salió bien

- se consolidó una landing completa con secciones reutilizables para `hero`, `nosotros`, `servicios`, `testimonios`, `faq`, `puntos de atención` y `contacto`
- el contenido quedó administrable desde `Sanity Studio`
- el requisito de consumo de endpoint quedó cubierto con `GET /api/home`
- el formulario quedó validado en cliente y servidor, con persistencia real en `Supabase`
- la protección anti-bot quedó reforzada con `Cloudflare Turnstile`, además de honeypot y tiempo mínimo de completado
- se logró despliegue público funcional en `Vercel`
- se generó evidencia objetiva de rendimiento mediante reportes `Lighthouse`
- la segunda medición sobre producción confirmó mejora real en mobile después del cambio a renderizado inicial en servidor

## Problemas encontrados

- el formulario mostró una integración más compleja de lo esperado al combinar `Turnstile`, validación propia y feedback visual
- durante la integración del captcha aparecieron reinicios del widget por re-renderizados del formulario
- el feedback del submit no reflejaba con claridad que la solicitud ya se había guardado en `Supabase`
- las primeras mediciones `Lighthouse` en mobile mostraron `LCP` alto, principalmente porque la home cargaba contenido inicial desde cliente
- la carga editorial definitiva en `Sanity` fue una de las últimas tareas en cerrarse antes de la entrega

## Qué se hizo para corregirlo

- se aisló el widget de `Turnstile` para evitar reinicializaciones innecesarias
- se reforzó el manejo de estados del formulario y el parsing de la respuesta del endpoint
- se movió la carga inicial de la home a renderizado en servidor para reducir el costo de render y mejorar el `LCP` percibido en mobile
- se documentaron las mediciones `Lighthouse` y su interpretación para la defensa del proyecto
- se repitió `Lighthouse` sobre `Vercel` para validar que la mejora no solo existiera en local

## Resultados de rendimiento

Medición base local:

- `desktop`: `FCP 0.2 s`, `LCP 0.9 s`, `TBT 0 ms`, `CLS 0`
- `mobile`: `FCP 0.8 s`, `LCP 6.9 s`, `TBT 210 ms`, `CLS 0`

Medición final en producción `Vercel`:

- `desktop`: `FCP 0.3 s`, `LCP 0.8 s`, `TBT 0 ms`, `CLS 0`
- `mobile`: `FCP 2.1 s`, `LCP 2.1 s`, `TBT 0 ms`, `CLS 0`

Interpretación:

- el problema crítico estaba en `mobile LCP`
- la mejora principal vino de dejar de depender del `fetch` cliente para pintar el contenido principal de la home
- la reducción de `TBT` a `0 ms` en mobile refuerza que la ruta principal quedó menos costosa de ejecutar en el arranque

## Aprendizajes

- medir temprano con `Lighthouse` ayuda a detectar problemas estructurales, no solo detalles visuales
- un `page.tsx` cliente puede perjudicar fuertemente la métrica de `LCP` cuando el contenido principal depende de `fetch` e hidratación
- integrar un captcha real mejora la defensa del requisito de seguridad, pero obliga a probar bien los ciclos de render del formulario
- el feedback visual del usuario es tan importante como la persistencia real del dato

## Qué quedó como mejora futura

- construir un panel admin para revisar y gestionar solicitudes desde `Supabase`
- seguir fortaleciendo accesibilidad fina en manejo de foco y anuncios para lectores de pantalla

## Plan de acción para la siguiente iteración

1. construir `/admin/contactos` para listar solicitudes por fecha y estado
2. usar los reportes y capturas ya generados como evidencia formal de rendimiento
3. realizar mejoras puntuales de accesibilidad en modal, feedback y navegación por teclado
4. dejar lista la documentación final de entrega con capturas o evidencia complementaria si se requiere
