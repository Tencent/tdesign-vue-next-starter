<template>
  <t-config-provider :global-config="getComponentsLocale">
    <router-view :key="locale" :class="[mode]" />
  </t-config-provider>
</template>
<script setup lang="ts">
import { computed, watch } from 'vue';

import { useLocale } from '@/locales/useLocale';
import { useSettingStore } from '@/store';

const store = useSettingStore();

const mode = computed(() => {
  return store.displayMode;
});

const { getComponentsLocale, locale } = useLocale();

watch(
  () => store.displayMode,
  () => {
    if (store.mode !== 'auto') return;

    store.changeMode('auto');
    store.changeBrandTheme(store.brandTheme);
  },
);
</script>
