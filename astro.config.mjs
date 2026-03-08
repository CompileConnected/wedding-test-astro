import { defineConfig } from "astro/config";
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import svelte from '@astrojs/svelte';


// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },
  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
  }),
});