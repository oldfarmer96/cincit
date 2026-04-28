// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import vue from "@astrojs/vue";

import node from "@astrojs/node";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://cincit.com",
  output: "server",
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [vue(), sitemap()],

  env: {
    schema: {
      NEXT_PUBLIC_API_URL: envField.string({
        context: "server",
        access: "public",
      }),
      JWT_SECRET: envField.string({
        context: "server",
        access: "secret",
      }),
      REGISTER_COOKIE_NAME: envField.string({
        context: "server",
        access: "secret",
      }),
      NODE_ENV: envField.string({
        context: "server",
        access: "secret",
      }),
      PERUDEVS_API_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      PERUDEVS_URL: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },

  adapter: node({
    mode: "standalone",
  }),
  server: {
    host: true,
    port: 5000,
  },
});
