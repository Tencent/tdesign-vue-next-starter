import path from 'node:path';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import type { ConfigEnv, UserConfig } from 'vite';
import { loadEnv } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import svgLoader from 'vite-svg-loader';

const CWD = process.cwd();

/**
 * CSS 目标浏览器，与 Vite 默认 build.target（baseline-widely-available）同源，JS/CSS 目标自动对齐。
 * 该档位随 caniuse-lite 升级滚动前移，需要结果可复现时改用固定档位 `['baseline 2024']`。
 */
const CSS_BROWSERS_QUERY = ['baseline widely available'];
const cssTargets = browserslistToTargets(browserslist(CSS_BROWSERS_QUERY));

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_BASE_URL, VITE_API_URL_PREFIX } = loadEnv(mode, CWD);
  return {
    base: VITE_BASE_URL,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    css: {
      // 接管转译阶段（默认走 postcss），设了 targets 才能按目标浏览器去前缀/降级；
      // Less 仍由 less 编译，本项目无 postcss 配置，切换无副作用
      transformer: 'lightningcss',
      lightningcss: {
        targets: cssTargets,
      },
      devSourcemap: true,
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

    plugins: [
      vue(),
      vueJsx(),
      viteMockServe({
        mockPath: 'mock',
        enable: true,
      }),
      svgLoader(),
    ],

    server: {
      port: 3002,
      host: '0.0.0.0',
      allowedHosts: true,
      proxy: {
        [VITE_API_URL_PREFIX]: 'http://127.0.0.1:3000/',
      },
    },

    // https://github.com/vueuse/vueuse/issues/5387#issuecomment-4734186040
    build: {
      cssMinify: 'lightningcss',
      rolldownOptions: {
        onLog(level, log, defaultHandler) {
          if (log.code === 'INVALID_ANNOTATION') return null;
          else defaultHandler(level, log);
        },
      },
    },
  };
};
