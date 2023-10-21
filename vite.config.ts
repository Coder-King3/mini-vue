import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL('./packages/index.js', import.meta.url)),
      name: 'MiniVueLib',
      fileName: 'mini-vue-lib'
    },
    rollupOptions: {
      output: {
        dir: 'build'
      }
    }
  }
})
