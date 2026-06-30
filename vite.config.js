import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- EKLENTİYİ İÇERİ ALDIK

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- TAILWIND V4'Ü BURADA AKTİF ETTİK
  ],
  base: './', // Canlı sunucuda yolların kaybolmasını önler
})