import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://blog.angeloff.name',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap(), mdx()],
});
