<template>
  <t-config-provider :global-config="getTdesignLocale">
    <router-view v-if="isRouterAlive" :class="[mode]" />
  </t-config-provider>
</template>
<script setup lang="ts">
import { ref, computed, provide, nextTick } from 'vue';
import { useSettingStore } from '@/store';
import { useLocale } from '@/locales/useLocale';

const store = useSettingStore();

const mode = computed(() => {
  return store.displayMode;
});

const { getTdesignLocale } = useLocale();

const isRouterAlive = ref(true);
const reload = () => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
};
provide('reload', reload);
</script>
<style lang="less" scoped>
#nprogress .bar {
  background: var(--td-brand-color) !important;
}
</style>
