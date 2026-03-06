import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({ out: 'build' }),
    csp: {
      mode: 'nonce',
      directives: {
        'default-src': ['self'],
        'script-src': ['self', 'https://scripts.simpleanalyticscdn.com'],
        'style-src': ['self', 'unsafe-inline'], // Svelte transitions use inline styles
        'img-src': ['self', 'data:'],
        'connect-src': ['self', 'https://api.simpleanalytics.com'],
        'media-src': ['self'],
      },
    },
  },
};

export default config;
