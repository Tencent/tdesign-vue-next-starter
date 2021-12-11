<template>
  <result
    page-header="网络异常"
    tip="网络异常，请稍后再试"
    bg-url="https://tdesign.gtimg.com/starter/result-page/network-error.png"
  >
    <div>
      <t-button theme="default" @click="() => $router.push('/')">返回首页</t-button>
      <t-button @click="() => $router.push('/')">重新加载</t-button>
    </div>
  </result>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Result from '@/components/result/index.vue';

export default defineComponent({
  name: 'ResultNetworkError',
  components: { Result },
});
</script>
