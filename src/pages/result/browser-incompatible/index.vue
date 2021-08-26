<template>
  <result
    page-header="浏览器不兼容"
    tip="抱歉，您正在使用的浏览器版本过低，无法打开当前网页"
    bg-url="https://tdesign.gtimg.com/pro-template/result-page/browser-incompatible.png"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Result from '@/components/result/index.vue';

export default defineComponent({
  name: 'ResultBrowserIncompatible',
  components: { Result },
});
</script>
