import { defineConfig } from 'vite';
// import { viteMockServe } from 'vite-plugin-mock';
import vueJsx from '@vitejs/plugin-vue-jsx';

import vue from '@vitejs/plugin-vue';

// import proxy from './src/config/proxy';
// const HttpProxyAgent = require('http-proxy-agent');
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
  ],
  server: {
    port: 3002,
  },
});
