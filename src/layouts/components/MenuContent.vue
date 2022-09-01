<template>
  <div>
    <template v-for="item in list" :key="item.path">
      <template v-if="!item.children || !item.children.length || item.meta?.single">
        <t-menu-item v-if="getHref(item)" :href="getHref(item)?.[0]" :name="item.path" :value="getPath(item)">
          <template #icon>
            <t-icon v-if="typeof item.icon === 'string' && item.icon" :name="item.icon" />
            <render-fn-icon v-else-if="isObject(item.icon)" :icon="item.icon" />
          </template>
          {{ item.title }}
        </t-menu-item>
        <t-menu-item v-else :name="item.path" :value="getPath(item)" :to="item.path">
          <template #icon>
            <t-icon v-if="typeof item.icon === 'string' && item.icon" :name="item.icon" />
            <render-fn-icon v-else-if="isObject(item.icon)" :icon="item.icon" />
          </template>
          {{ item.title }}
        </t-menu-item>
      </template>
      <t-submenu v-else :name="item.path" :value="item.path" :title="item.title">
        <template #icon>
          <t-icon v-if="typeof item.icon === 'string' && item.icon" :name="item.icon" />
          <render-fn-icon v-else-if="isObject(item.icon)" :icon="item.icon" />
        </template>
        <menu-content v-if="item.children" :nav-data="item.children" />
      </t-submenu>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import isObject from 'lodash/isObject';
import { MenuRoute } from '@/types/interface';
import { getActive } from '@/router';

import RenderFnIcon from './RenderFnIcon.vue';

const props = withDefaults(defineProps<{ navData: MenuRoute[] }>(), { navData: () => [] });

const active = computed(() => getActive());
const list = computed(() => {
  const { navData } = props;
  return getMenuList(navData);
});

const getMenuList = (list: MenuRoute[], basePath?: string): MenuRoute[] => {
  if (!list) {
    return [];
  }
  // 如果meta中有orderNo则按照从小到大排序
  list.sort((a, b) => {
    return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0);
  });
  return list
    .map((item) => {
      const path = basePath ? `${basePath}/${item.path}` : item.path;
      return {
        path,
        title: item.meta?.title,
        icon: item.meta?.icon || '',
        children: getMenuList(item.children, path),
        meta: item.meta,
        redirect: item.redirect,
      };
    })
    .filter((item) => item.meta && item.meta.hidden !== true);
};

const getHref = (item: MenuRoute) => {
  return item.path.match(/(http|https):\/\/([\w.]+\/?)\S*/);
};

const getPath = (item) => {
  if (active.value.startsWith(item.path)) {
    return active.value;
  }
  return item.meta?.single ? item.redirect : item.path;
};
</script>

<style lang="less" scoped></style>
