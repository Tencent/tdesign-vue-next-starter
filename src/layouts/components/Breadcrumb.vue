<template>
  <t-breadcrumb :max-item-width="'150'" class="tdesign-breadcrumb">
    <t-breadcrumbItem v-for="item in crumbs" :key="item.to" :to="item.to">
      {{ item.title }}
    </t-breadcrumbItem>
  </t-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const crumbs = computed(() => {
  const route = useRoute();

  const pathArray = route.path.split('/');
  pathArray.shift();

  const breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
    breadcrumbArray.push({
      path,
      to: breadcrumbArray[idx - 1] ? `/${breadcrumbArray[idx - 1].path}/${path}` : `/${path}`,
      title: route.matched[idx].meta.title || path,
    });
    return breadcrumbArray;
  }, []);
  return breadcrumbs;
});
</script>
<style scoped>
.tdesign-breadcrumb {
  margin-bottom: 8px;
}
</style>
