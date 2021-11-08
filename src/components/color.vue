<template>
  <div
    :style="style"
    class="color-container"
  />
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { getBrandColor } from '@/config/color';

export default defineComponent({
  name: 'Color',
  props: {
    value: {
      type: String as PropType<string>,
      default: 'default',
    },
  },
  setup(props) {
    const style = computed(() => {
      const { value } = props;
      return  {
        backgroundColor: getBrandColor(value)['@brand-color'],
      };
    });

    return {
      style,
    };
  },
});
</script>
<style lang="less" scoped>
.color-container {
  width: 24px;
  height: 24px;
  display: inline-block;
}
</style>

