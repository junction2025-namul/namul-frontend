import { defineConfig } from 'vite' // develop test
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
       proxy: {
         '/api': {
           target: 'https://namul-backend-production-7a51.up.railway.app', // Railway 백엔드 서버
           changeOrigin: true,
           secure: true, // HTTPS 사용
         },
       },
     },
})

