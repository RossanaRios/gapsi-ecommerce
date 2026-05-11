# e-Commerce Gapsi

Aplicación React 19 que permite buscar productos de Walmart y agregarlos a un carrito mediante drag & drop.

## Requisitos

- Node.js v22+
- Cuenta en [RapidAPI](https://rapidapi.com) con suscripción a **Axesso Walmart Data Service**

## Instalación

```bash
# 1. Clonar el repositorio
git clone <repo-url>
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
# Los archivos minificados y ofuscados quedan en /dist
```

## Arquitectura

| Capa | Descripción |
|------|-------------|
| `src/api/` | **Repository Pattern** — abstrae todas las llamadas a la API |
| `src/hooks/useIntersectionObserver.ts` | **Observer Pattern** — maneja infinite scroll |
| `src/context/` | Estado global del carrito |
| `src/hooks/` | Lógica reutilizable (búsqueda, scroll) |
| `src/components/` | Componentes UI atómicos |
| `src/pages/` | Vistas cargadas con lazy loading |
| `src/config/` | Variables de configuración centralizadas |

## Patrones de diseño

1. **Repository Pattern** → `src/api/walmartRepository.ts`
2. **Observer Pattern** → `src/hooks/useIntersectionObserver.ts`

## Features

- Búsqueda de productos con infinite scroll
- Virtual scroll para rendimiento óptimo
- Drag & drop para agregar al carrito
- Productos en carrito se ocultan de la lista
- PWA (instalable, soporte offline básico)
- Build minificado y ofuscado con Terser
