<template>
  <td-theme-generator :drawer-only="true" :drawer-visible="showGeneratorPanel" :props-top="0" />
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { useSettingStore } from '@/store';

const settingStore = useSettingStore();

const showGeneratorPanel = computed(() => {
  if (settingStore.showGeneratorDrawer) return true;
  return false;
});

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
