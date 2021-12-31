<template>
  <router-view :class="[mode]" />
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import config from '@/config/style';

export default defineComponent({
  setup() {
    const store = useStore();

    const mode = computed(() => {
      return store.getters['setting/mode'];
    });

    onMounted(() => {
      store.dispatch('setting/changeTheme', { ...config });
    });
    return {
      mode,
    };
  },
});
</script>
<style lang="less">
@import '@/style/variables.less';

#nprogress .bar {
  background: @brand-color !important;
}
</style>
