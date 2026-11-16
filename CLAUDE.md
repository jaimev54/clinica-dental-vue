# Clínica dental (Vue) — contexto del proyecto

## Qué es
Sitio web de una clínica dental ficticia. Es el **proyecto 1 de 3** de un portafolio para mejorar el CV de Jaime (desarrollador full-stack junior, Monterrey, México). Los otros dos: gestor de tareas con Next.js + Supabase y portafolio con Astro.

Objetivo doble: (1) tener un sitio que se vea profesional para mostrar a reclutadores y clientes, y (2) que Jaime **aprenda** cada pieza. Por eso se trabaja paso a paso.

## Cómo trabajar con Jaime
- Responde siempre en **español**.
- Respuestas **concisas y directas**. No cambies más de lo que se pide.
- Antes de crear o modificar archivos, explica en 1-3 líneas **qué hace y por qué**. Jaime está aprendiendo.
- Un paso a la vez. No generes toda la app de golpe.
- Jaime ya domina Angular, TypeScript, .NET y Laravel; compara con Angular cuando ayude (por ejemplo, `ref` vs signals, `v-for` vs `*ngFor`).
- Si algo falla, pide la captura de la consola o del navegador.
- Haz commits frecuentes con mensajes descriptivos, pero solo cuando Jaime lo pida.

## Stack
- Vue 3 con **Composition API** y `<script setup lang="ts">`
- TypeScript
- Vite
- Vue Router (SPA)
- ESLint + Prettier
- Tailwind CSS (se instala después de la creación del proyecto)
- Sin Pinia, sin JSX, sin tests por ahora
- Node 26 LTS, npm
- Deploy en **Netlify** (plan gratuito, con Netlify Forms para los formularios)

## Ubicación
`C:\Users\jaime\Desktop\proyectos\clinica-dental-vue` (Windows, consola cmd/PowerShell)

Proyecto creado con `npm create vue@latest` en modo **en blanco** (sin código de ejemplo).

## Comandos
- `npm install` — instalar dependencias
- `npm run dev` — servidor de desarrollo en http://localhost:5173
- `npm run build` — build de producción en `dist/`
- `npm run lint` — ESLint
- `npm run format` — Prettier

## Páginas a construir
1. **Inicio:** hero con llamada a la acción y resumen de servicios
2. **Servicios:** tarjetas filtrables por categoría (limpieza, ortodoncia, blanqueamiento, etc.)
3. **Equipo:** perfiles de los doctores
4. **Agendar cita:** formulario con doctor, fecha y hora, con validaciones
5. **Contacto:** ubicación, horarios y formulario de contacto

## Estructura de carpetas objetivo
```
src/
  assets/        imágenes y estilos globales
  components/    componentes reutilizables (NavBar, ServiceCard, DoctorCard, Footer...)
  views/         una vista por página (HomeView, ServicesView, TeamView, BookingView, ContactView)
  data/          datos estáticos (servicios, doctores)
  types/         interfaces de TypeScript
  router/        configuración de Vue Router
public/
  _redirects     "/*  /index.html  200" (para que Vue Router funcione en Netlify)
```

## Estándares de calidad (trabajar como profesional)
- Componentes pequeños y reutilizables, con props tipadas (`defineProps<...>()`)
- Diseño **responsive, mobile-first**
- HTML semántico (`header`, `nav`, `main`, `section`, `footer`), un solo `h1` por página
- Accesibilidad básica: `alt` en imágenes, labels en formularios, contraste suficiente, navegación con teclado
- SEO técnico: `title` y `meta description` únicos por ruta, URLs limpias
- Sin datos inventados que parezcan reales (la clínica es ficticia: dejarlo claro en el footer)
- README final con capturas, tecnologías y link al deploy

## Deploy (Netlify)
- Repo en GitHub (github.com/jaimev54), ramas `main` (producción) y `dev` (trabajo diario)
- Build command: `npm run build` — Publish directory: `dist`
- Cada deploy a producción cuesta 15 de los 300 créditos mensuales del plan gratuito: hacer merge a `main` solo cuando haya algo terminado
- Formularios: atributos `data-netlify="true"` y `name="..."` en el `<form>`, más un campo oculto `form-name`. Como es una SPA, hay que declarar también un formulario HTML estático en `public/` o `index.html` para que Netlify lo detecte en el build

## Nota de enfoque de renderizado
Este proyecto usa CSR (renderizado en el cliente) para practicar componentes, estado y rutas. En un cliente real, un sitio informativo que necesita SEO convendría con SSG o SSR. Es un punto para mencionar en entrevistas.

## Próximos pasos
1. Verificar que `npm run dev` funcione y revisar la estructura generada
2. Instalar y configurar Tailwind CSS
3. Crear la estructura de carpetas y el router con las 5 rutas
4. Construir NavBar y Footer
5. Construir cada vista, una por una
6. Formularios con validación y Netlify Forms
7. Pulir responsive, accesibilidad y SEO
8. Subir a GitHub y desplegar en Netlify
