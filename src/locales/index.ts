import type { DropdownOption } from 'tdesign-vue-next';
import en_US from 'tdesign-vue-next/es/locale/en_US';
import zh_CN from 'tdesign-vue-next/es/locale/zh_CN';
import { computed } from 'vue';
import type { I18nOptions } from 'vue-i18n';
import { createI18n } from 'vue-i18n';

export const localeConfigKey = 'tdesign-starter-locale';

// 定义支持的语言列表，添加新语言时只需在此处添加
export const supportedLocales = ['zh_CN', 'en_US'] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

// 多语言标题类型，用于路由 meta.title 等场景
export type LocalizedTitle = Record<SupportedLocale, string>;

const tdesignLocaleMap: Record<SupportedLocale, typeof zh_CN | typeof en_US> = { zh_CN, en_US };

const langModules = import.meta.glob<{ default: Record<string, unknown> }>('./lang/*.json', { eager: true });

const langCode: SupportedLocale[] = [];
const messages: I18nOptions['messages'] = {};
const langList: DropdownOption[] = [];

Object.entries(langModules).forEach(([path, module]) => {
  const code = path.match(/\.\/lang\/([^.]+)\.json$/)?.[1] as SupportedLocale | undefined;
  if (!code || !supportedLocales.includes(code)) return;
  langCode.push(code);
  messages[code] = { ...module.default, componentsLocale: tdesignLocaleMap[code] };
  langList.push({ content: module.default.lang as string, value: code });
});

export { langCode };

// 获取初始语言：优先本地存储，其次浏览器偏好，最后默认中文
const getInitialLocale = (): SupportedLocale => {
  const stored = localStorage.getItem(localeConfigKey);
  if (stored && supportedLocales.includes(stored as SupportedLocale)) {
    return stored as SupportedLocale;
  }
  const preferred = navigator.languages?.[0]?.replace(/-/g, '_');
  if (preferred && supportedLocales.includes(preferred as SupportedLocale)) {
    return preferred as SupportedLocale;
  }
  return 'zh_CN';
};

const initialLocale = getInitialLocale();

export const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'zh_CN',
  messages,
  globalInjection: true,
});

export const languageList = computed(() => langList);
export const { t } = i18n.global;
export default i18n;
