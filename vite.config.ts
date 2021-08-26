import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock';
const HttpProxyAgent = require('http-proxy-agent');
import vueJsx from '@vitejs/plugin-vue-jsx';

import vue from '@vitejs/plugin-vue'
const path = require('path');

import proxy from './src/config/proxy';

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
    vueJsx()
  ],
  server: {
    port: 3002,
  },
})
