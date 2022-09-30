<template>
  <router-view :class="[mode]" />
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useSettingStore } from '@/store';

const store = useSettingStore();

const mode = computed(() => {
  return store.displayMode;
});
</script>
<style lang="less" scoped>
#nprogress .bar {
  background: var(--td-brand-color) !important;
}
</style>
