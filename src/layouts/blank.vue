<template>
  <div class="tdesign-wrapper">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
});
</script>
<style lang="less">
.tdesign-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
