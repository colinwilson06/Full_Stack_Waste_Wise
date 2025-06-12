import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
    server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Ganti sesuai port backend kamu
        changeOrigin: true,
        // REPAIR: Remove or modify the rewrite rule.
        // If you want to keep the '/api' prefix on the backend, remove this line.
        // If your backend didn't use '/api' but only '/videos', then this line would be correct.
        // Since your backend uses '/api/videos', we should not rewrite it.
        // rewrite: path => path.replace(/^\/api/, ''), // THIS WAS THE PROBLEM LINE
      },
      '/auth': { // Also proxy auth routes
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})