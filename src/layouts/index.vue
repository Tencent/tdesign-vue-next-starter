<template>
  <div>
    <template v-if="setting.layout.value === 'side'">
      <t-layout key="side" :class="mainLayoutCls">
        <t-aside><layout-side-nav /></t-aside>
        <t-layout>
          <t-header><layout-header /></t-header>
          <t-content><layout-content /></t-content>
        </t-layout>
      </t-layout>
    </template>

    <template v-else>
      <t-layout key="no-side">
        <t-header><layout-header /> </t-header>
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
import { computed, onBeforeUnmount, onMounted, watch } from 'vue';
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

const toggleHeadVisible = () => {
  const layoutElement = document.querySelector(`.${prefix}-layout`);

  if (layoutElement) {
    const { scrollTop } = layoutElement;
    const headerMenuFixedElement = document.querySelector(`.${prefix}-header-menu-fixed`);
    const headerMenuFixedElementHeight = headerMenuFixedElement.scrollHeight;
    // 在操作监听过程中，如果已经隐藏了，就不再进行隐藏的dom操作// 如果已经显示了，就不再进行显示的dom操作
    let alreadyHidden = false;
    let alreadyShow = false;

    // 当面包屑存在时 fixed在头部
    if (settingStore.showBreadcrumb) {
      document.querySelector(`.t-layout__header`)?.setAttribute('style', `position:relative;`);
      const breadcrumbElement = document.querySelector(`.t-breadcrumb`);

      if (scrollTop > headerMenuFixedElementHeight && settingStore.toggleHeadVisible) {
        if (!alreadyHidden) {
          headerMenuFixedElement.setAttribute('style', 'display: none;');
          breadcrumbElement.setAttribute('style', 'position:absolute;top:18px;');
        }
        alreadyHidden = true;
        alreadyShow = false;
      } else {
        if (!alreadyShow) {
          headerMenuFixedElement.setAttribute('style', null);
          breadcrumbElement.setAttribute('style', null);
        }
        alreadyHidden = false;
        alreadyShow = true;
      }
    } else {
      const headerElement = document.querySelector(`.t-layout__header`);
      const sideNavMixFixedElement = document.querySelector(`.${prefix}-side-nav-mix-fixed`);

      if (scrollTop > headerMenuFixedElementHeight && settingStore.toggleHeadVisible) {
        if (!alreadyHidden) {
          headerElement.setAttribute('style', 'display: none;');
          (layoutElement as HTMLElement).style.height = '100vh';
          sideNavMixFixedElement?.setAttribute('style', 'top: 0;');
        }
        alreadyHidden = true;
        alreadyShow = false;
      } else {
        if (!alreadyShow) {
          headerElement.setAttribute('style', null);
          (layoutElement as HTMLElement).style.height = 'calc(100vh - var(--td-comp-size-xxxl))';
          sideNavMixFixedElement?.setAttribute('style', null);
        }
        alreadyHidden = false;
        alreadyShow = true;
      }
    }
  }
};

const toggleHeadVisibleScrollListener = () => {
  const targetElement = document.querySelector(`.${prefix}-layout`);
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

<style lang="less" scoped></style>
