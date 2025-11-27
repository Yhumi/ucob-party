import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwindcss()],

  adapter: node({
    mode: "middleware"
  }),

  output: 'server',
  site: 'https://ucob.miyei.me',
  security: {
    checkOrigin: false
  }
});