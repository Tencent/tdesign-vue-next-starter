import { useLocalStorage, usePreferredLanguages } from '@vueuse/core';
import type { DropdownOption } from 'tdesign-vue-next';
import en_US from 'tdesign-vue-next/es/locale/en_US';
import zh_CN from 'tdesign-vue-next/es/locale/zh_CN';
import { computed } from 'vue';
import type { I18nOptions } from 'vue-i18n';
import { createI18n } from 'vue-i18n';

// 导入语言文件 (JSON 方式)
const langModules = import.meta.glob<{ default: Record<string, unknown> }>('./lang/*.json', { eager: true });

// TDesign 组件 locale 映射
const TDESIGN_LOCALE_MAP: Record<string, Record<string, unknown>> = {
  zh_CN,
  en_US,
};

export const localeConfigKey = 'tdesign-starter-locale';

// 获取浏览器默认语言环境
const languages = usePreferredLanguages();

// 解析语言模块
const parseLangModules = () => {
  const langCode: string[] = [];
  const messages: I18nOptions['messages'] = {};
  const langList: DropdownOption[] = [];

  Object.entries(langModules).forEach(([path, module]) => {
    const match = path.match(/\.\/lang\/([^.]+)\.json$/);
    if (match) {
      const code = match[1];
      langCode.push(code);
      // 合并自定义语言包和 TDesign 组件 locale
      messages[code] = {
        ...module.default,
        componentsLocale: TDESIGN_LOCALE_MAP[code],
      };
      langList.push({
        content: module.default.lang as string,
        value: code,
      });
    }
  });

  return { langCode, messages, langList };
};

const { langCode, messages, langList } = parseLangModules();

export { langCode };

export const i18n = createI18n({
  legacy: false,
  locale: (useLocalStorage(localeConfigKey, 'zh_CN').value || languages.value[0] || 'zh_CN').replace(/-/g, '_'),
  fallbackLocale: 'zh_CN',
  messages,
  globalInjection: true,
});

export const languageList = computed(() => langList);

export const { t } = i18n.global;

export default i18n;
