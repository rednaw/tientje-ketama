import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port: parseInt(process.env.PORT || '5173', 10),
  },
  preview: {
    port: parseInt(process.env.PORT || '4173', 10),
  },
});
