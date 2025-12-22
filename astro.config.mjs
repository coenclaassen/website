import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.coenclaassen.com",
  integrations: [sitemap()]
});
