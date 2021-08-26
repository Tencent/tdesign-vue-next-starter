<template>
  <result
    page-header="500"
    tip="抱歉，服务器出错啦"
    bg-url="https://tdesign.gtimg.com/pro-template/result-page/500.png"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Result from '@/components/result/index.vue';

export default defineComponent({
  name: 'Result500',
  components: { Result },
});
</script>
