import { defineConfig } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import createVuePlugin from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  plugins: [
    createVuePlugin(),
    vueJsx(),
    viteMockServe({
      mockPath: 'mock',
      localEnabled: true,
    }),
    svgLoader(),
  ],

  server: {
    host: '0.0.0.0',
    port: 3003,
    proxy: {
      '/api': {
          // 用于开发环境下的转发请求
          // 更多请参考：https://vitejs.dev/config/#server-proxy
          target: 'http://127.0.0.1:3000/',
          changeOrigin: true,
        },
    },
  },
});
