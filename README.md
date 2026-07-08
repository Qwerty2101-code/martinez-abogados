# Martínez Abogados — Sitio web

Sitio estático bilingüe (HTML + CSS + JavaScript, sin dependencias ni build) para el despacho
Martínez Abogados. Diseño contemporáneo y sobrio inspirado en firmas líderes (Baker McKenzie,
Chévez Ruiz Zamarripa, PwC).

## Marca

- Azul marino `#0d1d3e` y naranja `#f96f17` (extraídos del logo).
- Tipografía: Fraunces (títulos) + Inter (texto e interfaz).
- Logo: monograma "MA" + "Martínez Abogados".

## Archivos

Sitio de varias páginas (multipágina), todas comparten encabezado, pie, estilos y scripts:

- `index.html` — Inicio (puerta de entrada con resúmenes que enlazan al resto).
- `firma.html` — La firma (incluye la sección Enfoque, ancla `#enfoque`).
- `areas.html` — Áreas de práctica (índice).
- `area-corporativo.html`, `area-oil-and-gas.html`, `area-evaluacion-proyectos.html`,
  `area-administracion-contratos.html` — una página por área (clave para SEO).
- `perspectivas.html` — Perspectivas (artículos / boletín).
- `contacto.html` — Contacto (formulario + datos).
- `styles.css` — sistema de diseño: paleta, tipografía, layout, animaciones, responsive.
- `script.js` — menú móvil, idioma ES/EN, resaltado de página actual, animaciones, formulario.
- `assets/` — logo procesado y favicons (ver abajo).

Todo el contenido es bilingüe ES/EN mediante atributos `data-en`. El encabezado y el pie están
duplicados en cada página (sin proceso de build); cuando el sitio crezca conviene migrar a un
generador estático (Astro/Eleventy) para no mantenerlos por separado.

## Assets del logo

A partir del logo original (baja resolución, 303×134) se generaron:

- `logo-clean.png` — lockup completo nítido (2424×1072), 3 colores de marca.
- `monogram-orange.png` — solo el monograma "MA", fondo transparente (se usa en el sitio).
- `logo-transparent.png` — lockup sin fondo (para fondos oscuros).
- `logo-enhanced.png` — versión rasterizada fiel al original, mejorada.
- `logo-lockup.png` — lockup a 900 px para web.
- `favicon-256.png`, `favicon-32.png`, `apple-touch-icon.png`.

## Idiomas (ES / EN)

El contenido en español está en el HTML; la traducción al inglés va en atributos `data-en`
(y `data-en-placeholder` para campos de formulario). El selector "ES / EN" del encabezado cambia
el idioma, lo recuerda (localStorage) y respeta el idioma del navegador en la primera visita.
También se puede forzar con `#lang=en` o `#lang=es` en la URL (enlaces compartibles).

## Ver el sitio en local

Abrir `index.html` en el navegador, o con un servidor local:

```bash
cd martinez-abogados
python3 -m http.server 8080
# http://localhost:8080
```

## Navegación

Inicio · La firma · Áreas de práctica (con una página por área) · Perspectivas · Contacto.
La sección/página de Equipo se eliminó a propósito.

## Pendiente de personalizar

- Datos de contacto reales: dirección, teléfono, correo, horario (en la barra superior, el pie y `contacto.html`).
- Imágenes reales (actualmente de referencia, desde Unsplash).
- Contenido real de las páginas de área y de Perspectivas (hoy son textos base editables).
- Enlaces de aviso de privacidad y términos legales.
- Conectar el envío del formulario (hoy muestra confirmación local; se puede enlazar a Resend u otro).

## Despliegue

Al ser estático, se publica en cualquier hosting: Railway, Netlify, Vercel, Cloudflare Pages o
GitHub Pages. No requiere proceso de build.
