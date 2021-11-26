<template>
  <div :class="`${PREFIX}-tree-panel`">
    <div class="list-tree-wrapper">
      <div class="list-tree-operator">
        <t-input v-model="filterText" placeholder="请输入关键词" @input="onInput">
          <template #suffix-icon>
            <t-icon-search size="20px" />
          </template>
        </t-input>
        <t-tree :data="TREE_DATA" hover expand-on-click-node :default-expanded="expanded" :filter="filterByText" />
      </div>
      <div class="list-tree-content">
        <list-common-table />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import TIconSearch from 'tdesign-vue-next/lib/icon/search';
import { PREFIX } from '@/config/global';

import { TREE_DATA } from './constants';
import ListCommonTable from '../components/Table.vue';

export default defineComponent({
  name: 'ListTree',
  components: {
    TIconSearch,
    ListCommonTable,
  },
  setup() {
    const filterByText = ref();
    const filterText = ref();
    return {
      PREFIX,
      TREE_DATA,
      expanded: ['0', '0-0', '0-1', '0-2', '0-3', '0-4'],
      filterText,
      filterByText,
      onInput() {
        filterByText.value = (node) => {
          const rs = node.label.indexOf(filterText.value) >= 0;
          return rs;
        };
      },
    };
  },
});
</script>
<style lang="less" scoped>
@import '@/style/variables.less';
.@{prefix} {
  &-tree-panel {
    background-color: @bg-color-container;
    border-radius: @border-radius;

    .t-tree {
      margin-top: 36px;
    }
  }

  &-search-input {
    width: 360px;
    margin-right: 8px;
  }

  &-operater-row {
    margin-bottom: 16px;
  }
}

.list-tree-wrapper {
  overflow-y: hidden;
}

.list-tree-operator {
  width: 200px;
  float: left;
  padding: 30px 32px;
}

.list-tree-content {
  border-left: 1px solid @border-level-1-color;
  overflow: auto;
}

.selet-base {
  width: 88px;
}
</style>
