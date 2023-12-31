import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '&': fileURLToPath(new URL('../', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 1024
  }
})
