// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Ensure the host is set to listen on all public IPs
    host: '0.0.0.0', // CRITICAL: Use '0.0.0.0' for wider compatibility
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});