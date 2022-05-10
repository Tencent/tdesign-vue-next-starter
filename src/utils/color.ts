import { Color } from 'tvision-color';
import * as echarts from 'echarts/core';
import { getBrandColor, defaultLightColor, defaultDarkColor } from '@/config/color';
import { getSettingStore } from '@/store';

/**
 * 依据主题类型获取颜色
 *
 * @export
 * @param {string} theme
 * @returns {}
 */
export function getColorFromTheme(theme: string) {
  const settingStore = getSettingStore();
  const { colorList, mode } = settingStore;
  const isDarkMode = mode === 'dark';
  let themeColorList = [];
  const themeColor = getBrandColor(theme, colorList);

  if (!/^#[A-F\d]{6}$/i.test(theme)) {
    theme = themeColor?.['--td-brand-color'] || '#0052D9';
    const themIdx = defaultLightColor.indexOf(theme.toLocaleLowerCase());
    const defaultGradients = !isDarkMode ? defaultLightColor : defaultDarkColor;

    const spliceThemeList = defaultGradients.slice(0, themIdx);
    themeColorList = defaultGradients.slice(themIdx, defaultGradients.length).concat(spliceThemeList);
  } else {
    theme = themeColor?.['--td-brand-color'];
    themeColorList = Color.getRandomPalette({
      color: theme,
      colorGamut: 'bright',
      number: 8,
    });
  }

  return themeColorList;
}

/** 图表颜色 */
export function getChartListColor(): Array<string> {
  const settingStore = getSettingStore();
  const { brandTheme } = settingStore;
  const res = getColorFromTheme(brandTheme);

  return res;
}

/**
 * 更改图表主题颜色
 *
 * @export
 * @param {Array<string>} chartsList
 * @param {string} theme
 */
export function changeChartsTheme(chartsList: echarts.EChartsType[]) {
  if (chartsList && chartsList.length) {
    const chartChangeColor = getChartListColor();

    for (let index = 0; index < chartsList.length; index++) {
      const elementChart = chartsList[index];

      if (elementChart) {
        const optionVal = elementChart.getOption();

        // 更改主题颜色
        optionVal.color = chartChangeColor;

        elementChart.setOption(optionVal, true);
      }
    }
  }
}
