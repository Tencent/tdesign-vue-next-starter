<template>
  <result :title="t('pages.result.maintenance.title')" :tip="t('pages.result.maintenance.subtitle')" type="maintenance">
    <t-button theme="primary" @click="() => $router.push('/')">{{ t('pages.result.maintenance.back') }}</t-button>
  </result>
</template>
<script setup lang="ts">
import Result from '@/components/result/index.vue';
import { t } from '@/locales';

defineOptions({
  name: 'ResultMaintenance',
});
</script>
