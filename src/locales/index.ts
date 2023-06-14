import { DropdownOption } from 'tdesign-vue-next';
import { computed } from 'vue';
import { createI18n } from 'vue-i18n';

// 导入语言文件
const langModules = import.meta.glob('./lang/**/*.ts', { eager: true });

const langModuleMap = new Map<string, () => Promise<Recordable>>();
export const LangCode: Array<string> = [];

// 获取浏览器默认语言环境
const browserLanguage = navigator.language.replace('-', '_');

// 生成语言模块列表
const generateLangModuleMap = () => {
  const fullPaths = Object.keys(langModules);
  fullPaths.forEach((fullPath) => {
    const k = fullPath.replace('./lang', '');
    const startIndex = 1;
    const lastIndex = k.lastIndexOf('.');
    const code = k.substring(startIndex, lastIndex);
    LangCode.push(code);
    langModuleMap.set(code, langModules[fullPath] as any);
  });
};

// 导出Message
const importMessages = computed(() => {
  generateLangModuleMap();

  const message: Recordable = {};
  langModuleMap.forEach((value: any, key) => {
    message[key] = value.default;
  });
  return message;
});

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || browserLanguage || 'zh_CN',
  fallbackLocale: 'zh_CN',
  messages: importMessages.value,
});
export const langList = computed(() => {
  if (langModuleMap.size === 0) generateLangModuleMap();

  const list: DropdownOption[] = [];
  langModuleMap.forEach((value: any, key) => {
    list.push({
      content: value.default.lang,
      value: key,
    });
  });

  return list;
});
// @ts-ignore
export const { t } = i18n.global;
export default i18n;
