<template>
  <span :class="containerCls">
    <span :class="iconCls">
      <svg
        v-if="type === 'down'"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.5 8L8 11.5L4.5 8" stroke="currentColor" stroke-width="1.5" />
        <path d="M8 11L8 4" stroke="currentColor" stroke-width="1.5" />
      </svg>
      <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.5 8L8 4.5L11.5 8" stroke="currentColor" stroke-width="1.5" />
        <path d="M8 5V12" stroke="currentColor" stroke-width="1.5" />
      </svg>
    </span>
    <span>{{ describe }}</span>
  </span>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  type: String,
  describe: [String, Number],
  isReverseColor: {
    type: Boolean,
    default: false,
  },
});

const containerCls = computed(() => {
  const { isReverseColor, type } = props;
  return [
    'trend-container',
    {
      'trend-container__reverse': isReverseColor,
      'trend-container__up': !isReverseColor && type === 'up',
      'trend-container__down': !isReverseColor && type === 'down',
    },
  ];
});

const iconCls = computed(() => ['trend-icon-container']);
</script>

<style lang="less" scoped>
@import '@/style/variables.less';
.trend {
  &-container {
    &__up {
      color: var(--tdvns-error-color);
      display: inline-flex;
      align-items: center;
      justify-content: center;

      .trend-icon-container {
        background: var(--tdvns-error-color-2);
        margin-right: 8px;
      }
    }

    &__down {
      color: var(--tdvns-success-color);
      display: inline-flex;
      align-items: center;
      justify-content: center;

      .trend-icon-container {
        background: var(--tdvns-success-color-2);
        margin-right: 8px;
      }
    }

    &__reverse {
      color: #ffffff;
      display: inline-flex;
      align-items: center;
      justify-content: center;

      .trend-icon-container {
        background: var(--tdvns-brand-color-5);
        margin-right: 8px;
      }
    }

    .trend-icon-container {
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
    }
  }
}
</style>
