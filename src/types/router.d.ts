import 'vue-router'

// Amplía el tipo RouteMeta de Vue Router: cada ruta debe declarar su título y descripción (SEO).
declare module 'vue-router' {
  interface RouteMeta {
    title: string
    description: string
  }
}
