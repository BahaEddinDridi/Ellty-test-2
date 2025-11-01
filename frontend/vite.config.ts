import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    allowedHosts: ['ellty-test-2-frontend.onrender.com'], 
    port: process.env.PORT ? parseInt(process.env.PORT) : 4173
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})
