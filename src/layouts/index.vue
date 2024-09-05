<template>
  <div>
    <template v-if="setting.layout.value === 'side'">
      <t-layout key="side" :class="mainLayoutCls">
        <t-aside><layout-side-nav /></t-aside>
        <t-layout>
          <Transition>
            <t-header><layout-header /></t-header>
          </Transition>
          <t-content><layout-content /></t-content>
        </t-layout>
      </t-layout>
    </template>

    <template v-else>
      <t-layout key="no-side">
        <Transition>
          <t-header><layout-header /> </t-header>
        </Transition>
        <t-layout :class="mainLayoutCls">
          <layout-side-nav />
          <layout-content />
        </t-layout>
      </t-layout>
    </template>
    <setting-com />
  </div>
</template>

<script setup lang="ts">
import '@/style/layout.less';

import { storeToRefs } from 'pinia';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { prefix } from '@/config/global';
import { useSettingStore, useTabsRouterStore } from '@/store';

import LayoutContent from './components/LayoutContent.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutSideNav from './components/LayoutSideNav.vue';
import SettingCom from './setting.vue';

const route = useRoute();
const settingStore = useSettingStore();
const tabsRouterStore = useTabsRouterStore();
const setting = storeToRefs(settingStore);
const showHeader = ref(true);

const mainLayoutCls = computed(() => [
  {
    't-layout--with-sider': settingStore.showSidebar,
  },
]);

const appendNewRoute = () => {
  const {
    path,
    query,
    meta: { title },
    name,
  } = route;
  tabsRouterStore.appendTabRouterList({ path, query, title: title as string, name, isAlive: true, meta: route.meta });
};

const toggleHeadVisibleScrollListener = () => {
  const targetElement = document.querySelector(`.${prefix}-layout`);
  const headerElement = document.querySelector(`header`);

  const toggleHeadVisible = () => {
    const layoutElement = document.querySelector(`.${prefix}-layout`);
    const headerMenuElement = document.querySelector(`.${prefix}-header-menu-fixed`);

    if (layoutElement) {
      const { scrollTop } = layoutElement;

      // 当面包屑存在时 面包屑存在时fixed在头部
      if (settingStore.showBreadcrumb) {
        const headerMenuFixedElementHeight = headerMenuElement?.scrollHeight || 0;
        document.querySelector(`.t-layout__header`)?.setAttribute('style', `position:relative;`);
        const breadcrumbElement = document.querySelector(`.t-breadcrumb`);

        if (scrollTop > headerMenuFixedElementHeight && settingStore.toggleHeadVisible) {
          headerMenuElement.setAttribute('style', 'display: none;');
          breadcrumbElement.setAttribute('style', 'position:absolute;top:18px;');
        } else {
          headerMenuElement.setAttribute('style', null);
          breadcrumbElement.setAttribute('style', null);
        }
      } else {
        const sideNavMixFixedElement = document.querySelector(`.${prefix}-side-nav-mix-fixed`);

        if (scrollTop > 50 && settingStore.toggleHeadVisible) {
          headerElement.style.transform = 'translate3d(0, -100%, 0)';
          headerElement.style.height = '0px';
          headerElement.style.overflow = 'hidden';

          (layoutElement as HTMLElement).style.height = '100vh';
          const htmlElement = document.querySelector('html');
          htmlElement.style.overflowY = 'hidden';

          if (sideNavMixFixedElement) {
            (sideNavMixFixedElement as HTMLElement).style.top = '0';
          }
        } else {
          headerElement?.setAttribute('style', null);
          if (sideNavMixFixedElement) {
            sideNavMixFixedElement?.setAttribute('style', null);
          }
        }
      }
    }
  };

  if (targetElement) {
    targetElement.addEventListener('scroll', toggleHeadVisible);
  }
};

onMounted(() => {
  appendNewRoute();

  toggleHeadVisibleScrollListener();
  const observer = new MutationObserver(() => {
    toggleHeadVisibleScrollListener();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  onBeforeUnmount(() => {
    observer.disconnect();
  });
});

watch(
  () => route.path,
  () => {
    appendNewRoute();
    document.querySelector(`.${prefix}-layout`).scrollTo({ top: 0, behavior: 'smooth' });
  },
);
</script>

<style lang="less" scoped>
header {
  transition:
    height 0.3s ease-in-out,
    transform 0.6s,
    opacity 0.6s;
  // transform: translateZ(0);
}
</style>
