<template>
  <img :class="className" :src="url" />
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

export default defineComponent({
  name: 'Thumbnail',
  props: {
    url: {
      type: String as PropType<string>,
      default: '',
    },
    type: {
      type: String as PropType<string>,
      default: 'layout',
    },
  },
  setup(props) {
    const className = computed(() => {
      const { type } = props;
      return [
        'thumbnail-container',
        {
          'thumbnail-circle': type === 'circle',
          'thumbnail-layout': type === 'layout',
        },
      ];
    });
    return { className };
  },
});
</script>
<style lang="less" scoped>
@import url('@/style/index.less');

.thumbnail {
  &-container {
    display: inline-block;
  }

  &-circle {
    border-radius: @border-radius-50;
  }

  &-layout {
    width: 88px;
    height: 48px;
  }
}
</style>
