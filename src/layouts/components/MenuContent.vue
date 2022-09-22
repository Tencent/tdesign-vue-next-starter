<template>
  <div>
    <template v-for="item in list" :key="item.path">
      <template v-if="!item.children || !item.children.length || item.meta?.single">
        <t-menu-item v-if="getHref(item)" :href="getHref(item)?.[0]" :name="item.path" :value="getPath(item)">
          <template #icon>
            <t-icon v-if="beIcon(item)" :name="item.icon" />
            <component :is="beRender(item).render" v-else-if="beRender(item).can" class="t-icon" />
          </template>
          {{ item.title }}
        </t-menu-item>
        <t-menu-item v-else :name="item.path" :value="getPath(item)" :to="item.path">
          <template #icon>
            <t-icon v-if="beIcon(item)" :name="item.icon" />
            <component :is="beRender(item).render" v-else-if="beRender(item).can" class="t-icon" />
          </template>
          {{ item.title }}
        </t-menu-item>
      </template>
      <t-submenu v-else :name="item.path" :value="item.path" :title="item.title">
        <template #icon>
          <t-icon v-if="beIcon(item)" :name="item.icon" />
          <component :is="beRender(item).render" v-else-if="beRender(item).can" class="t-icon" />
        </template>
        <menu-content v-if="item.children" :nav-data="item.children" />
      </t-submenu>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import isObject from 'lodash/isObject';
import { MenuRoute } from '@/types/interface';
import { getActive } from '@/router';

const props = defineProps({
  navData: {
    type: Array as PropType<MenuRoute[]>,
    default: () => [],
  },
});

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
      const path = basePath && !item.path.includes(basePath) ? `${basePath}/${item.path}` : item.path;
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

const beIcon = (item: MenuRoute) => {
  return item.icon && typeof item.icon === 'string';
};

const beRender = (item: MenuRoute) => {
  if (isObject(item.icon) && typeof item.icon.render === 'function') {
    return {
      can: true,
      render: item.icon.render,
    };
  }
  return {
    can: false,
    render: null,
  };
};
</script>

<style lang="less" scoped></style>
