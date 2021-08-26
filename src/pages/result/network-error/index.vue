<template>
  <result
    page-header="网络异常"
    tip="网络异常，请稍后再试"
    bg-url="https://tdesign.gtimg.com/pro-template/result-page/network-error.png"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Result from '@/components/result/index.vue';

export default defineComponent({
  name: 'ResultNetworkError',
  components: { Result },
});
</script>
