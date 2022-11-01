import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
import image from '@astrojs/image';

export default defineConfig({
  integrations: [tailwind(), solidJs(), image()],
});
