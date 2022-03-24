<template>
  <result title="404 Not Found" tip="抱歉，您访问的页面不存在" type="404">
    <t-button @click="() => $router.push('/')">返回首页</t-button>
  </result>
</template>

<script lang="ts">
export default {
  name: 'Result404',
};
</script>

<script setup lang="ts">
import Result from '@/components/result/index.vue';
</script>
