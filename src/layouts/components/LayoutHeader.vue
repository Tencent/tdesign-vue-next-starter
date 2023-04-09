<template>
  <l-header
    v-if="settingStore.showHeader"
    :show-logo="settingStore.showHeaderLogo"
    :theme="settingStore.displayMode"
    :layout="settingStore.layout"
    :is-fixed="settingStore.isHeaderFixed"
    :menu="headerMenu"
    :is-compact="settingStore.isSidebarCompact"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import { usePermissionStore, useSettingStore } from '@/store';
import { MenuRoute } from '@/types/interface';

import LHeader from './Header.vue';

const permissionStore = usePermissionStore();
const settingStore = useSettingStore();
const { routers: menuRouters } = storeToRefs(permissionStore);
const headerMenu = computed(() => {
  if (settingStore.layout === 'mix') {
    if (settingStore.splitMenu) {
      return (menuRouters.value as Array<MenuRoute>).map((menu) => {
        return {
          ...menu,
          children: [],
        };
      });
    }
    return [];
  }
  return menuRouters.value as Array<MenuRoute>;
});
</script>
