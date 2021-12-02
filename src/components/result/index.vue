<template>
  <div class="result-container">
    <img class="result-bg-img" :src="bgUrl" />
    <div class="result-title">
      {{ title }}
    </div>
    <div class="result-tip">
      {{ tip }}
    </div>
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Result',
  props: {
    bgUrl: {
      type: String as PropType<string>,
      default: '',
    },
    title: {
      type: String as PropType<string>,
      default: '',
    },
    tip: {
      type: String as PropType<string>,
      default: '',
    },
  },
});
</script>
<style lang="less" scoped>
@import url('@/style/index.less');

.result {
  &-link {
    color: @brand-color;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: @brand-color;
    }

    &:active {
      color: @brand-color;
    }

    &--active {
      color: @brand-color;
    }

    &:focus {
      text-decoration: none;
    }
  }

  &-container {
    min-height: 400px;
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  &-bg-img {
    width: 256px;
    height: 256px;
  }

  &-tip {
    margin: 8px 0 32px;
    font-size: @font-size-base;
    color: @text-color-secondary;
    line-height: 22px;
  }
}
</style>
