<template>
  <t-page-header> 合同档案 </t-page-header>
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
<style>

</style>
