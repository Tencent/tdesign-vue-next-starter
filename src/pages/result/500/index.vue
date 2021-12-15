<template>
  <result title="500 Internal Server Error" type="500" tip="抱歉，服务器出错啦">
    <t-button @click="() => $router.push('/')">返回首页</t-button>
  </result>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Result from '@/components/result/index.vue';

export default defineComponent({
  name: 'Result500',
  components: { Result },
});
</script>
