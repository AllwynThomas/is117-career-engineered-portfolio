import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/is117-career-engineered-portfolio/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        notFound: resolve(__dirname, '404.html'),
      },
    },
  },
});
