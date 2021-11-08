<template>
  <div :class="containerCls">
    <div :class="titleCls">
      <span :class="titleTextCls">
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
    <div
      v-if="size !== 'small'"
      class="card-spacer-bottom"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

export default defineComponent({
  name: 'Card',
  props: {
    title: {
      type: String as PropType<string>,
      default: '',
    },
    compact: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    describe: {
      type: String as PropType<string>,
      default: '',
    },
    size: {
      type: String as PropType<string>,
      default: 'default',
    },
  },
  setup(props) {
    const containerCls = computed(() => {
      const { compact } = props;
      return ['card-container', { 'card-container-compact': compact }];
    });

    const titleCls = computed(() => {
      const { size } = props;
      return [
        'card-title',
        {
          'card-title-small': size === 'small',
          'card-title-default': size !== 'small',
        },
      ];
    });

    const titleTextCls = computed(() => {
      const { size } = props;
      return [
        {
          'card-title-text-small': size === 'small',
          'card-title-text-default': size !== 'small',
        },
      ];
    });

    return {
      containerCls,
      titleCls,
      titleTextCls,
    };
  },
});
</script>
<style lang="less" scoped>
@import url('@/style/index.less');

.t-col > .card-container {
  margin: 0;
}

.card {

  &-option {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-container {
    padding: 24px 32px;
    margin: 16px 0;
    background: #fff;
    border-radius: @border-radius;
    width: 100%;
    display: flex;
    flex-direction: column;

    &-compact {
      padding: 16px 16px 0;
      margin-top: 24px;
      margin-bottom: 16px;
    }
  }

  &-title {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    line-height: 22px;
    font-family: PingFangSC-Regular;
    font-weight: 500;
    color: @text-color-primary;

    &-small {
      margin-bottom: 8px;
    }

    &-default {
      margin-bottom: 16px;
    }

    &-text {
      display: inline-flex;

      &-default {
        margin: @spacer 0;
      }
    }
  }

  &-describe {
    font-size: 14px;
    color: rgba(0, 0, 0, .6);
    line-height: 22px;
  }

  &-content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex: 1;
  }

  &-spacer-bottom {
    height: @spacer;
  }
}
</style>
