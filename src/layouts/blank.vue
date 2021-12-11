<template>
  <div class="tdesign-wrapper">
    <router-view />
    <tdesign-setting />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TdesignSetting from './setting.vue';

export default defineComponent({
  components: {
    TdesignSetting,
  },
});
</script>
<style lang="less">
.tdesign-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
