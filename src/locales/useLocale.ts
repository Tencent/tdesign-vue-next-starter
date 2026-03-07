import { useLocalStorage } from '@vueuse/core';
import type { GlobalConfigProvider } from 'tdesign-vue-next';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { i18n, langCode, localeConfigKey } from '@/locales/index';
import { useNotificationStore } from '@/store/modules/notification';

export function useLocale() {
  const { locale } = useI18n({ useScope: 'global' });
  const storedLocale = useLocalStorage(localeConfigKey, 'zh_CN');

  const changeLocale = (lang: string) => {
    if (!langCode.includes(lang)) {
      lang = 'zh_CN';
    }
    locale.value = lang;
    storedLocale.value = lang;
    // 刷新持久化的翻译数据
    useNotificationStore().refreshMsgData();
  };

  const getComponentsLocale = computed(() => {
    return i18n.global.getLocaleMessage(locale.value).componentsLocale as GlobalConfigProvider;
  });

  return {
    changeLocale,
    getComponentsLocale,
    locale,
  };
}
