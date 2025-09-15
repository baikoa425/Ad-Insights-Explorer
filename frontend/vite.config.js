import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/anomalies': 'http://localhost:8000',
      '/summary': 'http://localhost:8000',
    },
  },
});
