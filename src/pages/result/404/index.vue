<template>
  <result
    page-header="404"
    tip="抱歉，您访问的页面不存在"
    bg-url="https://tdesign.gtimg.com/pro-template/result-page/404.png"
  >
    <t-button @click="() => $router.push('/')">返回首页</t-button>
  </result>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Result from '@/components/result/index.vue';

export default defineComponent({
  name: 'Result404',
  components: { Result },
});
</script>
