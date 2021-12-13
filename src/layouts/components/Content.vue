<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
<style lang="less" scoped>
@import '@/style/variables';

.fade-leave-active,
.fade-enter-active {
  transition: opacity @anim-duration-slow @anim-time-fn-easing;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
