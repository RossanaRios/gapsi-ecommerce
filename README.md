# e-Commerce Gapsi

Aplicación React 19 que permite buscar productos de Walmart y agregarlos a un carrito mediante drag & drop.

## Requisitos

- Node.js v20.x o superior
- Cuenta en [RapidAPI](https://rapidapi.com) con suscripción a **Axesso Walmart Data Service**

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/RossanaRios/gapsi-ecommerce.git
cd gapsi-ecommerce

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env y reemplazar VITE_RAPIDAPI_KEY con tu key de RapidAPI

# 4. Iniciar en desarrollo
npm run dev
```

## Build de producción

```bash
npm run build
# Los archivos minificados y ofuscados con Terser quedan en /dist
```

## Stack tecnológico

- **React 19** + TypeScript
- **Material-UI v6** — sistema de componentes
- **react-window** — virtual scroll
- **Bootstrap 5** y **Font Awesome 6** — desde CDN
- **Vite 5** — bundler con Terser para minificado y ofuscado
- **React Router v7** — lazy loading de rutas

## Arquitectura

| Capa | Descripción |
|------|-------------|
| `src/api/` | **Repository Pattern** — abstrae todas las llamadas a la API |
| `src/hooks/useIntersectionObserver.ts` | **Observer Pattern** — animación fade-in de cards al entrar al viewport |
| `src/context/` | Estado global del carrito |
| `src/hooks/` | Lógica reutilizable (búsqueda, paginación) |
| `src/components/` | Componentes UI atómicos, cada uno con su propio `index.css` |
| `src/pages/` | Vistas cargadas con lazy loading + Suspense |
| `src/config/` | Variables de configuración centralizadas |

## Patrones de diseño

1. **Repository Pattern** → `src/api/walmartRepository.ts`  
   Abstrae el acceso a datos: la app solo llama al repositorio sin conocer la fuente (RapidAPI, fetch, etc.).

2. **Observer Pattern** → `src/hooks/useIntersectionObserver.ts`  
   Envuelve la API nativa `IntersectionObserver`. Usado en `ProductCard` para detectar cuando una card entra al viewport y aplicar animación fade-in.

## Features

- Búsqueda de productos con infinite scroll (paginación automática al hacer scroll)
- Virtual scroll con react-window para rendimiento óptimo
- Drag & drop nativo (HTML5) para agregar productos al carrito
- Productos en carrito se ocultan de la lista de resultados
- Modal con detalle completo del producto
- Animación fade-in en cards al entrar al viewport
- PWA: manifest + service worker para soporte offline básico
- Build minificado y ofuscado con Terser
