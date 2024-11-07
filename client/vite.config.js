import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Accepts connections from any IP address
    port: 5173,      // Sets the development server port
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Proxy API requests to your backend
        secure: false, // Allows non-secure connections (useful for local development)
      },
    },
  },
  plugins: [react()], // Uses the SWC plugin for React
});
