<template>
  <l-side-nav
    v-if="settingStore.showSidebar"
    :show-logo="settingStore.showSidebarLogo"
    :layout="settingStore.layout"
    :is-fixed="settingStore.isSidebarFixed"
    :menu="sideMenu"
    :theme="settingStore.displaySideMode"
    :is-compact="settingStore.isSidebarCompact"
  />
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { usePermissionStore, useSettingStore } from '@/store';
import type { MenuRoute } from '@/types/interface';
import { normalizePath } from '@/utils/route';

import LSideNav from './SideNav.vue';

const route = useRoute();
const permissionStore = usePermissionStore();
const settingStore = useSettingStore();
const { routers: menuRouters } = storeToRefs(permissionStore);

const sideMenu = computed(() => {
  const { layout, splitMenu } = settingStore;
  let newMenuRouters = menuRouters.value as Array<MenuRoute>;
  if (layout === 'mix' && splitMenu) {
    const currentPath = normalizePath(route.path);
    newMenuRouters.forEach((menu) => {
      const menuPath = normalizePath(menu.path);
      if (currentPath.startsWith(menuPath)) {
        newMenuRouters = menu.children.map((subMenu) => ({
          ...subMenu,
          path: normalizePath(`${menuPath}/${subMenu.path}`),
        }));
      }
    });
  }
  return newMenuRouters;
});
</script>
