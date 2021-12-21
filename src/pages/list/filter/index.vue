<template>
  <common-table />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CommonTable from '../components/CommonTable.vue';

export default defineComponent({
  name: 'ListBase',
  components: {
    CommonTable,
  },
});
</script>
