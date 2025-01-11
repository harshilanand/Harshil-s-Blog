import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    outDir: 'dist'
  },
  base: '/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://harshil-s-blog.onrender.com', // Proxy to backend server
    },
  },
  resolve: {
    alias: {
      '@components': '/src/components', // Alias for components folder
    },
  },
});
