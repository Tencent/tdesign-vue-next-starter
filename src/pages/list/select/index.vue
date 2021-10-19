<template>
  <list-common-table />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ListCommonTable from '@/components/list-common/list-table.vue';

export default defineComponent({
  name: 'ListBase',
  components: {
    ListCommonTable,
  },
});

</script>
<style lang="less" scoped>
@import '@/style/index';
.@{prefix} {

  &-panel {
    background-color: white;
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
