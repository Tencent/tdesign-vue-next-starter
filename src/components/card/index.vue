<template>
  <div :class="containerCls">
    <div v-if="title || $slots.title || $slots.option || subtitle || describe" :class="titleCls">
      <div :class="titleTextCls">
        {{ title }}
        <span v-if="describe" class="card-describe">{{ describe }}</span>
        <span v-if="subtitle" class="card-subtitle">{{ subtitle }}</span>
      </div>
      <span class="card-option">
        <slot name="option" />
      </span>
    </div>
    <div class="card-content">
      <slot />
    </div>
    <div v-if="size !== 'small'" class="card-spacer-bottom" />
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
    subtitle: {
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
    border: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const containerCls = computed(() => {
      const { compact, border } = props;
      return ['card-container', { 'card-container-compact': compact, 'card-container--border': border }];
    });

    const titleCls = computed(() => {
      const { size } = props;
      return [
        'card-title',
        {
          'card-title--small': size === 'small',
          'card-title--default': size !== 'small',
        },
      ];
    });

    const titleTextCls = computed(() => {
      const { size } = props;
      return [
        {
          'card-title__text--small': size === 'small',
          'card-title__text--default': size !== 'small',
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
<style lang="less">
@import '@/style/variables';

.t-col-lg-6 + .t-col-lg-6 {
  @media (max-width: @screen-md-max) {
    .card-container {
      margin-top: 16px;
    }
  }
}

.card {
  &-option {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-container {
    padding: 24px 32px;
    background: @bg-color-container;
    border-radius: @border-radius;
    width: 100%;
    display: flex;
    flex-direction: column;

    &-compact {
      padding: 16px 16px 0;
      margin-top: 24px;
      margin-bottom: 16px;
    }

    &--border {
      border: solid 1px @component-border;
    }
  }

  &-title {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    line-height: 24px;
    font-family: PingFangSC-Regular;
    font-weight: 500;
    color: @text-color-primary;

    &--small {
      margin-bottom: 8px;
    }

    &--default {
      margin-bottom: 24px;
    }

    &__text {
      display: inline-flex;

      &--default {
        margin: @spacer 0;
      }

      &--small {
        display: inline-block;
        width: 100%;
      }
    }
  }

  &-describe {
    font-size: 14px;
    color: @brand-color;
    color: @text-color-placeholder;
    line-height: 22px;
    margin-left: 4px;
  }
  &-subtitle {
    font-size: 14px;
    color: @brand-color;
    color: @text-color-secondary;
    line-height: 22px;
    margin-left: 4px;
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
