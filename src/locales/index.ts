import { useLocalStorage, usePreferredLanguages } from '@vueuse/core';
import type { DropdownOption } from 'tdesign-vue-next';
import { computed } from 'vue';
import type { I18nOptions } from 'vue-i18n';
import { createI18n } from 'vue-i18n';

// 导入语言文件 (JSON 方式)
const langModules = import.meta.glob<{ default: Record<string, unknown> }>('./lang/*.json', { eager: true });

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
      messages[code] = module.default;
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
