<template>
  <div class="table-tree-container">
    <div class="list-tree-wrapper">
      <div class="list-tree-operator">
        <t-input v-model="filterText" placeholder="请输入关键词" @input="onInput">
          <template #suffix-icon>
            <search-icon size="20px" />
          </template>
        </t-input>
        <t-tree :data="TREE_DATA" hover expand-on-click-node :default-expanded="expanded" :filter="filterByText" />
      </div>
      <div class="list-tree-content">
        <common-table />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ListTree',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { SearchIcon } from 'tdesign-icons-vue-next';

import { TREE_DATA } from './constants';
import CommonTable from '../components/CommonTable.vue';

const filterByText = ref();
const filterText = ref();

const expanded = ['0', '0-0', '0-1', '0-2', '0-3', '0-4'];

const onInput = () => {
  filterByText.value = (node) => {
    const rs = node.label.indexOf(filterText.value) >= 0;
    return rs;
  };
};
</script>

<style lang="less" scoped>
@import '@/style/variables.less';
.table-tree-container {
  background-color: var(--tdvns-bg-color-container);
  border-radius: var(--tdvns-border-radius);

  .t-tree {
    margin-top: 24px;
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
  border-left: 1px solid var(--tdvns-border-level-1-color);
  overflow: auto;
}
</style>
