import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { i18n, LangCode } from '@/locales/index';

export function useLocale() {
  const { locale } = useI18n({ useScope: 'global' });
  function changeLocale(lang: string) {
    // 如果切换的语言不在对应语言文件里则默认为简体中文
    if (!LangCode.includes(lang)) {
      lang = 'zh_CN';
    }

    locale.value = lang;
    localStorage.setItem('lang', lang);
  }
  const getTdesignLocale = computed(() => {
    return (i18n.global.getLocaleMessage(locale.value as string) as any).tdesignLocale;
  });
  return {
    changeLocale,
    getTdesignLocale,
  };
}
