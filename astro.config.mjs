import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: 'https://wenxiangdong.github.io',
  markdown: {
    shikiConfig: {
      theme: 'vitesse-dark',
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
