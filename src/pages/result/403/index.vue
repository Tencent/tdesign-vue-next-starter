<template>
  <result
    page-header="403"
    tip="抱歉，您无权限访问此页面，企业微信联系创建者xiaolaoshi"
    bg-url="https://tdesign.gtimg.com/pro-template/result-page/403.png"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Result from '@/components/result/index.vue';

export default defineComponent({
  name: 'Result403',
  components: { Result },
});
</script>
