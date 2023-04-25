<template>
  <td-theme-generator :props-top="0" />
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

import { useSettingStore } from '@/store';

const settingStore = useSettingStore();

onMounted(() => {
  const themeGenerator = document.querySelector('td-theme-generator');
  themeGenerator.addEventListener('panel-drawer-visible', (v: CustomEvent) => {
    if (!v?.detail?.[0])
      settingStore.updateConfig({
        showGeneratorDrawer: false,
      });
  });
});
</script>
