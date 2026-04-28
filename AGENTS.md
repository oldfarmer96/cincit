# CINCIT Landing - Agent Instructions

## Dev Commands
- `npm run dev` — Starts dev server on **port 5000** (not 4321)
- `npm run build` — Runs `astro check` then `astro build`
- `npm run preview` — Preview production build

## Build & Typecheck
`npm run build` executes `astro check && astro build`. Type errors will block the build.

## Architecture
- **Astro SSR** with Node.js adapter (`output: "server"`)
- **Vue** components integrated; use `client:idle` directive (see `Layout.astro:69`)
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (no tailwind.config)
- API routes in `src/pages/api/` proxy to `NEXT_PUBLIC_API_URL`
- Auth: JWT via `jose` library; middleware at `src/middleware.ts` protects `/complete-register`
- Path alias: `@/*` maps to `./src/*`

## Environment Variables
Defined in `astro.config.mjs` using `envField`. Required vars:
- `NEXT_PUBLIC_API_URL` — Backend API URL
- `JWT_SECRET` — For jose JWT verification
- `REGISTER_COOKIE_NAME` — Cookie name for auth token
- `NODE_ENV` — production/development
- `PERUDEVS_API_KEY`, `PERUDEVS_URL` — PeruDevs integration

Copy `.env.template` to `.env` for local development.

## Node Requirement
Node >= 22.11.0
