// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://kirori-1.github.io",
  output: "static",
  base: "/",
  integrations: [mdx(), sitemap(),tailwind()],
  vite: {
    optimizeDeps: {
      include: ["three"], // 确保 Three.js 被优化
    },
  },
});
