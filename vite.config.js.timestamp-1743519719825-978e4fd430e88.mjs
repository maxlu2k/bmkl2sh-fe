// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///E:/work-base-front-end/bmkl-fe/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/work-base-front-end/bmkl-fe/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueDevTools from "file:///E:/work-base-front-end/bmkl-fe/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///E:/work-base-front-end/bmkl-fe/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      // Sử dụng import.meta.url thay vì __dirname
    }
  },
  server: {
    port: 3e3
  },
  build: {
    outDir: "dist",
    // Đảm bảo thư mục build ra đúng tên
    assetsDir: "assets",
    // Lưu tài nguyên trong dist/assets
    emptyOutDir: true
    // Xóa dist trước khi build lại
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFx3b3JrLWJhc2UtZnJvbnQtZW5kXFxcXGJta2wtZmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHdvcmstYmFzZS1mcm9udC1lbmRcXFxcYm1rbC1mZVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovd29yay1iYXNlLWZyb250LWVuZC9ibWtsLWZlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgdnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbdnVlKCksIHZ1ZURldlRvb2xzKCldLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLCAvLyBTXHUxRUVEIGRcdTFFRTVuZyBpbXBvcnQubWV0YS51cmwgdGhheSB2XHUwMEVDIF9fZGlybmFtZVxuICAgIH0sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDAsXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnZGlzdCcsIC8vIFx1MDExMFx1MUVBM20gYlx1MUVBM28gdGhcdTAxQjAgbVx1MUVFNWMgYnVpbGQgcmEgXHUwMTExXHUwMEZBbmcgdFx1MDBFQW5cbiAgICBhc3NldHNEaXI6ICdhc3NldHMnLCAvLyBMXHUwMUIwdSB0XHUwMEUwaSBuZ3V5XHUwMEVBbiB0cm9uZyBkaXN0L2Fzc2V0c1xuICAgIGVtcHR5T3V0RGlyOiB0cnVlLCAvLyBYXHUwMEYzYSBkaXN0IHRyXHUwMUIwXHUxRURCYyBraGkgYnVpbGQgbFx1MUVBMWlcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtSLFNBQVMsZUFBZSxXQUFXO0FBQ3JULFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLGlCQUFpQjtBQUhpSixJQUFNLDJDQUEyQztBQUsxTixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztBQUFBLEVBQzlCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUE7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUE7QUFBQSxJQUNSLFdBQVc7QUFBQTtBQUFBLElBQ1gsYUFBYTtBQUFBO0FBQUEsRUFDZjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
