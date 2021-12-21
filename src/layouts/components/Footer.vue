<template>
  <div :class="prefix + '-footer'">Copyright @ 2021-{{ new Date().getFullYear() }} Tencent. All Rights Reserved</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { prefix } from '@/config/global';

export default defineComponent({
  name: `${prefix}-footer`,
  setup() {
    return {
      prefix,
    };
  },
});
</script>

<style lang="less" scoped>
@import '@/style/variables';

.@{prefix}-footer {
  color: @text-color-placeholder;
  line-height: 20px;
  text-align: center;
}
</style>
