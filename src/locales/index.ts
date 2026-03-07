import type { DropdownOption } from 'tdesign-vue-next';
import en_US from 'tdesign-vue-next/es/locale/en_US';
import zh_CN from 'tdesign-vue-next/es/locale/zh_CN';
import { computed } from 'vue';
import type { I18nOptions } from 'vue-i18n';
import { createI18n } from 'vue-i18n';

export const localeConfigKey = 'tdesign-starter-locale';

const TDESIGN_LOCALE_MAP: Record<string, Record<string, unknown>> = { zh_CN, en_US };

const langModules = import.meta.glob<{ default: Record<string, unknown> }>('./lang/*.json', { eager: true });

const langCode: string[] = [];
const messages: I18nOptions['messages'] = {};
const langList: DropdownOption[] = [];

Object.entries(langModules).forEach(([path, module]) => {
  const code = path.match(/\.\/lang\/([^.]+)\.json$/)?.[1];
  if (!code) return;
  langCode.push(code);
  messages[code] = { ...module.default, componentsLocale: TDESIGN_LOCALE_MAP[code] };
  langList.push({ content: module.default.lang as string, value: code });
});

export { langCode };

// 初始化读取（一次性）
const stored = localStorage.getItem(localeConfigKey);
const preferred = navigator.languages?.[0];
const candidate = (stored || preferred || 'zh_CN').replace(/-/g, '_');
const initialLocale = langCode.includes(candidate) ? candidate : 'zh_CN';

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
