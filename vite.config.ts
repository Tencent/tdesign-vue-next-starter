import { defineConfig } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import { viteThemePlugin } from 'vite-plugin-theme';
import createVuePlugin from '@vitejs/plugin-vue';
import createSvgPlugin from 'vite-plugin-vue-svg';
import vueJsx from '@vitejs/plugin-vue-jsx';

import HttpProxyAgent from 'http-proxy-agent';
import path from 'path';

import proxy from './src/config/proxy';
import { getColorList, getGreyColor, getBrandColor } from './src/config/color';
import USER_CONFIG from './src/config/style';

const { brandTheme, backgroundTheme } = USER_CONFIG;

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './src'),
    },
  },

  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          ...getBrandColor(brandTheme),
          ...getGreyColor(backgroundTheme),
        },
      },
    },
  },

  plugins: [
    createVuePlugin(),
    vueJsx(),
    viteMockServe({
      mockPath: 'mock',
      localEnabled: true,
    }),
    viteThemePlugin({
      colorVariables: getColorList([getGreyColor(backgroundTheme), getBrandColor(brandTheme)]),
    }),
    createSvgPlugin(),
  ],

  server: {
    port: 3002,
  },
});
