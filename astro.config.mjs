import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import lightningcss from 'vite-plugin-lightningcss';
import vercel from '@astrojs/vercel/serverless';
import svelte from '@astrojs/svelte';


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte()],
  vite: {
    ssr: {
      external: ['svelte'],
    },
    optimizeDeps: {
      include: ['svelte'],
    },
    plugins: [
      lightningcss({
        browserslist: '>= 0.25%',
      }),
    ]
  },
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
  }),
});