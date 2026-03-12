<template>
  <t-breadcrumb max-item-width="150" class="tdesign-breadcrumb">
    <t-breadcrumbItem v-for="item in crumbs" :key="item.to" :to="item.to">
      {{ item.title }}
    </t-breadcrumbItem>
  </t-breadcrumb>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import type { LocalizedTitle } from '@/locales';
import { useLocale } from '@/locales/useLocale';

const { locale } = useLocale();
const route = useRoute();

const renderTitle = (title?: LocalizedTitle, fallback?: string) => {
  if (!title) return fallback || '';
  return title[locale.value as keyof LocalizedTitle] || fallback || '';
};

const crumbs = computed(() => {
  const pathArray = route.path.split('/');
  pathArray.shift();

  const breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
    // 如果路由下有hiddenBreadcrumb或当前遍历到参数则隐藏
    const meta = route.matched[idx]?.meta;
    if (meta?.hiddenBreadcrumb || Object.values(route.params).includes(path)) {
      return breadcrumbArray;
    }
    const title = renderTitle(meta?.title as LocalizedTitle, path);
    breadcrumbArray.push({
      path,
      to: breadcrumbArray[idx - 1] ? `${breadcrumbArray[idx - 1].to}/${path}` : `/${path}`,
      title,
    });
    return breadcrumbArray;
  }, []);
  return breadcrumbs;
});
</script>
<style scoped>
.tdesign-breadcrumb {
  margin-bottom: 24px;
}
</style>
