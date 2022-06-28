<template>
  <t-config-provider :global-config="{ classPrefix: 'tt' }">
    <router-view :class="[mode]" />
  </t-config-provider>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import config from '@/config/style';
import { useSettingStore } from '@/store';

const store = useSettingStore();

const mode = computed(() => {
  return store.displayMode;
});

onMounted(() => {
  store.updateConfig({ ...config });
});
</script>
<style lang="less" scoped>
@import '@/style/variables.less';

#nprogress .bar {
  background: var(--tdvns-brand-color) !important;
}
</style>
