import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: 'https://wenxiangdong.github.io',
  markdown: {
    shikiConfig: {
      // theme: 'css-variables',
      theme: 'dark-plus',
      langs: ['json', 'shell', 'typescript', 'javascript']
    }
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    preact(),
  ],
  
});
