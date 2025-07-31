<template>
  <result title="403 Forbidden" :tip="t('pages.result.403.tips')">
    <t-button @click="() => $router.push('/')">{{ t('pages.result.403.back') }}</t-button>
  </result>
</template>
<script setup lang="ts">
import Result from '@/components/result/index.vue';
import { t } from '@/locales';

defineOptions({
  name: 'Result403',
});
</script>
