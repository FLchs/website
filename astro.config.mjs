// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://francoislachese.com",
  integrations: [mdx(), sitemap()],
  vite: { plugins: [tailwindcss()] },
  markdown: {
    shikiConfig: {
      theme: "catppuccin-frappe", // TODO: fix to macchiato or chose a better theme ? or not ?
    },
  },
});
