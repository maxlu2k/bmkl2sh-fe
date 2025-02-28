import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // Sử dụng import.meta.url thay vì __dirname
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist', // Đảm bảo thư mục build ra đúng tên
    assetsDir: 'assets', // Lưu tài nguyên trong dist/assets
    emptyOutDir: true, // Xóa dist trước khi build lại
  },
})
