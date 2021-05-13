import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vitePluginImp from 'vite-plugin-imp'
import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '~': resolve(__dirname, './'),
      '@': resolve(__dirname, './src'),
      apis: resolve(__dirname, './src/apis'),
      assets: resolve(__dirname, './src/assets'),
      comps: resolve(__dirname, './src/components'),
      store: resolve(__dirname, './src/store'),
      router: resolve(__dirname, './src/router'),
      directives: resolve(__dirname, './src/directives'),
      utils: resolve(__dirname, './src/utils'),
      views: resolve(__dirname, './src/views'),
      styles: resolve(__dirname, './src/styles'),
      common: resolve(__dirname, './src/common'),
      plugins: resolve(__dirname, './src/plugins'),
      layouts: resolve(__dirname, './src/layouts'),
    }
  },
  plugins: [
    vue(),
    vitePluginImp({
      libList: [
        {
          libName: 'element-plus',
          style: (name) => {
            return `element-plus/lib/theme-chalk/${name}.css`
          }
        }
      ]
    }),
    vueJsx(),
    // viteMockServe({
    //   supportTs: true,
    // }),
  ],
  server: {
    port: 4000,
    open: false,
    cors: true

    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000/api',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace('/api', '')
    //   }
    // }
  }
})
