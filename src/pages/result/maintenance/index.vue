<template>
  <result title="系统维护中" tip="系统维护中，请稍后再试" type="maintenance">
    <t-button theme="default" @click="() => $router.push('/')">返回首页</t-button>
  </result>
</template>

<script lang="ts">
export default {
  name: 'ResultMaintenance',
};
</script>
<script setup lang="ts">
import Result from '@/components/result/index.vue';
</script>
