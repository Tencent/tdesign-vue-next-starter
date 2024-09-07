import path from 'node:path';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import svgLoader from 'vite-svg-loader';

const cwd = process.cwd();

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_BASE_PORT, VITE_BASE_URL, VITE_USE_MOCK, VITE_API_URL, VITE_API_URL_PREFIX }: Partial<ImportMetaEnv> =
    loadEnv(mode, cwd);
  return {
    base: VITE_BASE_URL,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: Number(VITE_BASE_PORT),
      host: '0.0.0.0',
      proxy: {
        [VITE_API_URL_PREFIX]: VITE_API_URL,
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      viteMockServe({
        mockPath: 'mock',
        enable: VITE_USE_MOCK === 'true',
      }),
      svgLoader(),
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${path.resolve('src/style/variables.less')}";`,
          },
          math: 'strict',
          javascriptEnabled: true,
        },
      },
    },
  };
};
