<template>
  <div>
    <!-- 顶部 card  -->
    <top-panel class="row-container" />
    <!-- 中部图表  -->
    <middle-chart class="row-container" />
    <!-- 列表排名 -->
    <rank-list class="row-container" />
    <!-- 出入库概览 -->
    <over-view class="row-container" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'DashboardBase',
};
</script>

<script setup lang="ts">
import TopPanel from './components/top-panel.vue';
import MiddleChart from './components/middle-chart.vue';
import RankList from './components/rank-list.vue';
import OverView from './components/overview.vue';
</script>

<style scoped>
.row-container {
  margin-bottom: 16px;
}
</style>
