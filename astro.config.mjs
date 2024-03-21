import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import remarkToc from "remark-toc";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: "https://wenxiangdong.github.io",
  markdown: {
    shikiConfig: {
      // theme: 'css-variables',
      theme: "dark-plus",
      langs: ["json", "shell", "typescript", "javascript", "tsx", "jsx", "css", "html"],
    },
    remarkPlugins: [
      [
        remarkToc,
        {
          heading: "目录",
          maxDepth: 2,
        },
      ],
    ],
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    solidJs(),
  ],
});
