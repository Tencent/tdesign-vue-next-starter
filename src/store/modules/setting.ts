import keys from 'lodash/keys';
import { defineStore } from 'pinia';
import { Color } from 'tvision-color';

import { DARK_CHART_COLORS, LIGHT_CHART_COLORS } from '@/config/color';
import STYLE_CONFIG from '@/config/style';
import { store } from '@/store';
import { generateColorMap, insertThemeStylesheet } from '@/utils/color';

const state = {
  ...STYLE_CONFIG,
  showSettingPanel: false,
  colorList: {},
  chartColors: LIGHT_CHART_COLORS,
};

export type TState = typeof state;
export type TStateKey = keyof typeof state;

export const useSettingStore = defineStore('setting', {
  state: () => state,
  getters: {
    showSidebar: (state) => state.layout !== 'top',
    showSidebarLogo: (state) => state.layout === 'side',
    showHeaderLogo: (state) => state.layout !== 'side',
    displayMode: (state): 'dark' | 'light' => {
      if (state.mode === 'auto') {
        const media = window.matchMedia('(prefers-color-scheme:dark)');
        if (media.matches) {
          return 'dark';
        }
        return 'light';
      }
      return state.mode as 'dark' | 'light';
    },
  },
  actions: {
    async changeMode(mode: 'dark' | 'light' | 'auto') {
      let theme = mode;

      if (mode === 'auto') {
        const media = window.matchMedia('(prefers-color-scheme:dark)');
        if (media.matches) {
          theme = 'dark';
        } else {
          theme = 'light';
        }
      }
      const isDarkMode = theme === 'dark';

      document.documentElement.setAttribute('theme-mode', isDarkMode ? 'dark' : '');

      this.chartColors = isDarkMode ? DARK_CHART_COLORS : LIGHT_CHART_COLORS;
    },
    changeBrandTheme(brandTheme: string) {
      const mode = this.displayMode;
      // 以主题色加显示模式作为键
      const colorKey = `${brandTheme}[${mode}]`;
      let colorMap = this.colorList[colorKey];
      // 如果不存在色阶，就需要计算
      if (colorMap === undefined) {
        const [{ colors: newPalette, primary: brandColorIndex }] = Color.getColorGradations({
          colors: [brandTheme],
          step: 10,
          remainInput: false, // 是否保留输入 不保留会矫正不合适的主题色
        });
        colorMap = generateColorMap(brandTheme, newPalette, mode as 'light' | 'dark', brandColorIndex);
        this.colorList[colorKey] = colorMap;
      }
      // TODO 需要解决不停切换时有反复插入 style 的问题
      insertThemeStylesheet(brandTheme, colorMap, mode as 'light' | 'dark');
      document.documentElement.setAttribute('theme-color', brandTheme);
    },
    updateConfig(payload: Partial<TState>) {
      for (const key in payload) {
        if (payload[key as TStateKey] !== undefined) {
          this[key] = payload[key as TStateKey];
        }
        if (key === 'mode') {
          this.changeMode(payload[key]);
        }
        if (key === 'brandTheme') {
          this.changeBrandTheme(payload[key]);
        }
      }
    },
  },
  persist: {
    paths: [...keys(STYLE_CONFIG), 'colorList', 'chartColors'],
  },
});

export function getSettingStore() {
  return useSettingStore(store);
}
