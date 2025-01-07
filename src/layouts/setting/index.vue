<template>
  <div>
    <!-- 页面配置 -->
    <page-config />
    <!-- 主题皮肤配置 -->
    <td-theme-generator :props-top="0" :show-setting="true" />
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

import { useSettingStore } from '@/store';

import PageConfig from './page-config.vue';

const settingStore = useSettingStore();

onMounted(() => {
  const themeGenerator = document.querySelector('td-theme-generator');
  // @ts-ignore
  themeGenerator.addEventListener('click-setting', () => {
    settingStore.showSettingPanel = true;
  });
  // @ts-ignore
  themeGenerator.addEventListener('panel-drawer-visible', (v: CustomEvent) => {
    if (v?.detail?.[0]) settingStore.showSettingPanel = false;
  });
});
</script>
