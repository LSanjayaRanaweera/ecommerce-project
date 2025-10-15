import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],  
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000'         // Backend server URL
      },
      '/images': {
        target: 'http://localhost:3000'         // Backend server URL for images
      }
    }
  }
})
//Note: In production, the frontend and backend would be served from the same origin, so no proxy is needed.
//This proxy is only for development convenience.
//With this proxy, axios.get("/api/products") in the frontend will be forwarded to "http://localhost:3000/api/products" on the backend. 
//This avoids CORS issues and allows us to use relative paths in our axios calls.