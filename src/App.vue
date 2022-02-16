<template>
  <router-view :class="[mode]" />
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import config from '@/config/style';

const store = useStore();

const mode = computed(() => {
  return store.getters['setting/mode'];
});

onMounted(() => {
  store.dispatch('setting/changeTheme', { ...config });
});
</script>
<style lang="less">
@import '@/style/variables.less';

#nprogress .bar {
  background: @brand-color !important;
}
</style>
