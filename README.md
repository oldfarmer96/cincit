# CINCIT Landing

Sitio web oficial del Congreso Internacional de Computación e Innovación Tecnológica (CINCIT).

## Tech Stack

- **Astro** con SSR
- **Vue 3** para componentes interactivos
- **Tailwind CSS v4**
- **Vercel** como plataforma de despliegue

## Scripts

| Command           | Action                              |
| :---------------- | :---------------------------------- |
| `npm install`     | Instala dependencias               |
| `npm run dev`     | Servidor de desarrollo en :5000   |
| `npm run build`   | Build de producción (`astro check` + `astro build`) |
| `npm run preview` | Previsualiza el build local        |

## Estructura

```
src/
├── components/      # Componentes reutilizables (.astro y .vue)
├── layouts/         # Layout principal
├── pages/           # Rutas y API endpoints
│   ├── api/         # Serverless functions
│   ├── index.astro  # Página principal
│   ├── register.astro
│   ├── complete-register.astro
│   └── schedule.astro
├── sections/        # Secciones de página
├── schemas/         # Zod schemas para validación
├── data/            # Datos estáticos
└── middleware.ts    # Auth JWT
```

## Variables de Entorno

Configuradas en `astro.config.mjs` via `envField`. En desarrollo, copiar `.env.template` a `.env`.

Requeridas:
- `NEXT_PUBLIC_API_URL` — URL del backend
- `JWT_SECRET` — Secret para JWT
- `REGISTER_COOKIE_NAME` — Nombre de la cookie de auth
- `PERUDEVS_API_KEY`, `PERUDEVS_URL` — Integración PeruDevs

## Despliegue

El proyecto usa `@astrojs/vercel` y se despliega directamente a Vercel conectando el repositorio de GitHub.

Build command: `npm run build`
