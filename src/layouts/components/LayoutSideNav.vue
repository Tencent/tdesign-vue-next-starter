<template>
  <l-side-nav
    v-if="settingStore.showSidebar"
    :show-logo="settingStore.showSidebarLogo"
    :layout="settingStore.layout"
    :is-fixed="settingStore.isSidebarFixed"
    :menu="sideMenu"
    :theme="settingStore.displayMode"
    :is-compact="settingStore.isSidebarCompact"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { usePermissionStore, useSettingStore } from '@/store';
import LSideNav from './SideNav.vue';

const route = useRoute();
const permissionStore = usePermissionStore();
const settingStore = useSettingStore();
const { routers: menuRouters } = storeToRefs(permissionStore);

const { t } = useI18n();

const sideMenu = computed(() => {
  const { layout, splitMenu } = settingStore;
  let newMenuRouters = menuRouters.value;
  if (layout === 'mix' && splitMenu) {
    newMenuRouters.forEach((menu) => {
      if (route.path.indexOf(menu.path) === 0) {
        newMenuRouters = menu.children.map((subMenu) => ({ ...subMenu, path: `${menu.path}/${subMenu.path}` }));
      }
    });
  }
  // 侧边栏菜单文字国际化支持
  newMenuRouters.forEach((menu) => {
    if (menu.name === 'dashboard') {
      menu.meta.title = t('home.dashboard');
      menu.children.forEach((child) => {
        if (child.name === 'DashboardBase') {
          child.meta.title = t('home.dashboardBase');
        }
        if (child.name === 'DashboardDetail') {
          child.meta.title = t('home.dashboardDetail');
        }
      });
    }
    if (menu.name === 'list') {
      menu.meta.title = t('list.home');
    }
    if (menu.name === 'form') {
      menu.meta.title = t('form.home');
    }
    if (menu.name === 'detail') {
      menu.meta.title = t('detail.home');
    }
    if (menu.name === 'Frame') {
      menu.meta.title = t('frame.home');
    }
    if (menu.name === 'result') {
      menu.meta.title = t('result.home');
    }
    if (menu.name === 'user') {
      menu.meta.title = t('user.home');
    }
    if (menu.name === 'loginRedirect') {
      menu.meta.title = t('user.login.home');
    }
  });
  return newMenuRouters;
});
</script>
