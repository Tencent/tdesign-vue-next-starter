<template>
  <card>
    <div class="result-container">
      <img
        class="result-bg-img"
        :src="bgUrl"
      >
      <div class="result-tip">
        {{ tip }}
      </div>
      <div>
        <router-link
          class="tdesign-pro-main-link"
          to="/"
        >
          <t-button
            theme="primary"
            variant="text"
          >
            返回首页
          </t-button>
        </router-link>
      </div>
    </div>
  </card>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Card from '@/components/card/index.vue';
export default defineComponent({
  name: 'Result',
  components: { Card },
  props: ['bgUrl', 'tip', 'linkUrl', 'pageHeader'],
});
</script>
<style lang="less" scoped>
@import url('@/style/index.less');
.result {
  &-link {
    color: @primary-color;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: @primary-color;
    }

    &:active {
      color: @primary-color;
    }

    &--active {
      color: @primary-color;
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
    margin: 16px 0 8px;
    font-size: @font-size-base;
    color: @text-level-2-color;
    line-height: 22px;
  }
}
</style>
