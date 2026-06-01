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

## Problemas encontrados

- el formulario mostró una integración más compleja de lo esperado al combinar `Turnstile`, validación propia y feedback visual
- durante la integración del captcha aparecieron reinicios del widget por re-renderizados del formulario
- el feedback del submit no reflejaba con claridad que la solicitud ya se había guardado en `Supabase`
- las primeras mediciones `Lighthouse` en mobile mostraron `LCP` alto, principalmente porque la home cargaba contenido inicial desde cliente
- la carga editorial definitiva en `Sanity` todavía no está cerrada por completo

## Qué se hizo para corregirlo

- se aisló el widget de `Turnstile` para evitar reinicializaciones innecesarias
- se reforzó el manejo de estados del formulario y el parsing de la respuesta del endpoint
- se movió la carga inicial de la home a renderizado en servidor para reducir el costo de render y mejorar el `LCP` percibido en mobile
- se documentaron las mediciones `Lighthouse` y su interpretación para la defensa del proyecto

## Aprendizajes

- medir temprano con `Lighthouse` ayuda a detectar problemas estructurales, no solo detalles visuales
- un `page.tsx` cliente puede perjudicar fuertemente la métrica de `LCP` cuando el contenido principal depende de `fetch` e hidratación
- integrar un captcha real mejora la defensa del requisito de seguridad, pero obliga a probar bien los ciclos de render del formulario
- el feedback visual del usuario es tan importante como la persistencia real del dato

## Qué quedó pendiente

- cerrar la carga editorial final en `Sanity`
- construir un panel admin para revisar y gestionar solicitudes desde `Supabase`
- repetir `Lighthouse` sobre el entorno productivo en `Vercel` para dejar medición final más representativa
- hacer una última pasada de pulido visual y accesibilidad con el contenido definitivo

## Plan de acción para la siguiente iteración

1. completar el contenido real en `Sanity` y validar todas las secciones
2. construir `/admin/contactos` para listar solicitudes por fecha y estado
3. repetir `Lighthouse` en producción y comparar contra la medición local actual
4. realizar ajustes finales de accesibilidad, feedback y consistencia responsive
5. dejar lista la documentación final de entrega con capturas o evidencia complementaria si se requiere
