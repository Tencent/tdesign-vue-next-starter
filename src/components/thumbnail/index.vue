<template>
  <img
    :class="className"
    :src="url"
  >
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Thumbnail',
  props: {
    url: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'layout',
    },
  },
  computed: {
    className() {
      return [
        'thumbnail-container',
        {
          'thumbnail-circle': this.type === 'circle',
          'thumbnail-layout': this.type === 'layout',
        },
      ];
    },
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
    width: 120px;
    height: 70px;
  }
}
</style>
