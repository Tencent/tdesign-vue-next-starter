<template>
  <div :class="containerCls">
    <div
      v-show="title || describe"
      class="card-title"
    >
      <span>
        {{ title }}
        <span
          v-if="describe"
          class="card-describe"
        >{{ describe }}</span>
      </span>
      <span class="card-option">
        <slot name="option" />
      </span>
    </div>
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Card',
  props: {
    title: String,
    compact: {
      type: Boolean,
      default: false,
    },
    describe: String,
  },
  computed: {
    containerCls() {
      return ['card-container', { 'card-container-compact': this.compact }];
    },
  },
});
</script>
<style lang="less" scoped>
@import url('@/style/index.less');
.card {
  &-option {
    position: absolute;
    top: 20px;
    right: 24px;
  }
  &-container {
    padding: 24px;
    margin: 16px 0;
    background: #fff;
    border-radius: @border-radius;
    width: 100%;

    &-compact {
      padding: 16px 16px 0;
      margin-top: 24px;
      margin-bottom: 16px;
    }
  }

  &-title {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    line-height: 24px;
    font-family: PingFangSC-Medium;
    margin-bottom: 16px;
    font-weight: 500;
    color: @text-level-1-color;
  }

  &-describe {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    line-height: 22px;
  }

  &-content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
}
</style>
