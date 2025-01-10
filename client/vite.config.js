import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    outDir: 'dist'
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001', // Proxy to backend server
    },
  },
  resolve: {
    alias: {
      '@components': '/src/components', // Alias for components folder
    },
  },
});
