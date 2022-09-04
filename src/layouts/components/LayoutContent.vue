<template>
  <t-layout :class="`${prefix}-layout`">
    <t-tabs
      v-if="settingStore.isUseTabsRouter"
      theme="card"
      :class="`${prefix}-layout-tabs-nav`"
      :value="$route.path"
      :style="{ position: 'sticky', top: 0, width: '100%' }"
      @change="handleChangeCurrentTab"
      @remove="handleRemove"
    >
      <t-tab-panel
        v-for="(routeItem, index) in tabRouters"
        :key="`${routeItem.path}_${index}`"
        :value="routeItem.path"
        :removable="!routeItem.isHome"
      >
        <template #label>
          <t-dropdown
            trigger="context-menu"
            :min-column-width="128"
            :popup-props="{ overlayClassName: 'route-tabs-dropdown' }"
          >
            <template v-if="!routeItem.isHome">
              {{ routeItem.title }}
            </template>
            <t-icon v-else name="home" />
            <template #dropdown>
              <t-dropdown-menu v-if="$route.path === routeItem.path">
                <t-dropdown-item @click="() => handleRefresh(routeItem, index)">
                  <t-icon name="refresh" />
                  刷新
                </t-dropdown-item>
                <t-dropdown-item v-if="index > 0" @click="() => handleCloseAhead(routeItem.path, index)">
                  <t-icon name="arrow-left" />
                  关闭左侧
                </t-dropdown-item>
                <t-dropdown-item
                  v-if="index < tabRouters.length - 1"
                  @click="() => handleCloseBehind(routeItem.path, index)"
                >
                  <t-icon name="arrow-right" />
                  关闭右侧
                </t-dropdown-item>
                <t-dropdown-item @click="() => handleCloseOther(routeItem.path, index)">
                  <t-icon name="close-circle" />
                  关闭其它
                </t-dropdown-item>
              </t-dropdown-menu>
            </template>
          </t-dropdown>
        </template>
      </t-tab-panel>
    </t-tabs>
    <t-content :class="`${prefix}-content-layout`">
      <l-breadcrumb v-if="settingStore.showBreadcrumb" />
      <l-content />
    </t-content>
    <t-footer v-if="settingStore.showFooter" :class="`${prefix}-footer-layout`">
      <l-footer />
    </t-footer>
  </t-layout>
</template>

<script setup lang="ts">
import { nextTick, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSettingStore, useTabsRouterStore } from '@/store';
import { prefix } from '@/config/global';
import { TRouterInfo } from '@/types/interface';

import LContent from './Content.vue';
import LBreadcrumb from './Breadcrumb.vue';
import LFooter from './Footer.vue';

const route = useRoute();
const router = useRouter();

const settingStore = useSettingStore();
const tabsRouterStore = useTabsRouterStore();
const tabRouters = computed(() => tabsRouterStore.tabRouters.filter((route) => route.isAlive || route.isHome));

const handleChangeCurrentTab = (path: string) => {
  const { tabRouters } = tabsRouterStore;
  const route = tabRouters.find((i) => i.path === path);
  router.push({ path, query: route.query });
};

const handleRemove = ({ value: path, index }) => {
  const { tabRouters } = tabsRouterStore;
  const nextRouter = tabRouters[index + 1] || tabRouters[index - 1];

  tabsRouterStore.subtractCurrentTabRouter({ path, routeIdx: index });
  if (path === route.path) router.push({ path: nextRouter.path, query: nextRouter.query });
};

const handleRefresh = (route: TRouterInfo, routeIdx: number) => {
  tabsRouterStore.toggleTabRouterAlive(routeIdx);
  nextTick(() => {
    tabsRouterStore.toggleTabRouterAlive(routeIdx);
    router.replace({ path: route.path, query: route.query });
  });
};
const handleCloseAhead = (path: string, routeIdx: number) => {
  tabsRouterStore.subtractTabRouterAhead({ path, routeIdx });
};
const handleCloseBehind = (path: string, routeIdx: number) => {
  tabsRouterStore.subtractTabRouterBehind({ path, routeIdx });
};
const handleCloseOther = (path: string, routeIdx: number) => {
  tabsRouterStore.subtractTabRouterOther({ path, routeIdx });
};
</script>
