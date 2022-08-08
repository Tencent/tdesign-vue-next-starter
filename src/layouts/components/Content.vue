<template>
  <router-view v-if="!isRefreshing" v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <keep-alive :include="aliveViews">
        <component :is="Component" :key="activeRouteFullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
import { useTabsRouterStore } from '@/store';

const activeRouteFullPath = computed(() => {
  const router = useRouter();
  return router.currentRoute.value.fullPath;
});

const aliveViews = computed(() => {
  const tabsRouterStore = useTabsRouterStore();
  const { tabRouters } = tabsRouterStore;

  return tabRouters.filter((route) => route.isAlive).map((route) => route.name);
}) as ComputedRef<string[]>;

const isRefreshing = computed(() => {
  const tabsRouterStore = useTabsRouterStore();
  const { refreshing } = tabsRouterStore;
  return refreshing;
});
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
