<template>
  <common-table />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CommonTable from '../components/Table.vue';

export default defineComponent({
  name: 'ListBase',
  components: {
    CommonTable,
  },
});
</script>
<style lang="less" scoped>
@import '@/style/index';

.@{prefix} {
  &-panel {
    background-color: @bg-color-container;
    padding: @spacer-3;
    border-radius: @border-radius;
  }

  &-operater-row {
    margin-bottom: 16px;
  }

  &-form-item-content {
    width: 240px;
    display: inline-block;
    margin-right: 40px;
  }
}
</style>
