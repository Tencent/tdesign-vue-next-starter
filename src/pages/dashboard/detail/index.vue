<template>
  <div class="dashboard-panel-detail">
    <card title="本月采购申请情况">
      <t-row :gutter="[16, 16]">
        <t-col v-for="(item, index) in PANE_LIST_DATA" :key="index" :xs="6" :xl="3">
          <card border class="dashboard-detail-container-item" size="small" :subtitle="item.title">
            <div class="number">{{ item.number }}</div>
            <div class="dashboard-detail-container-item-text">
              <div class="dashboard-detail-container-item-text-left">
                环比
                <trend class="icon" :type="item.upTrend ? 'up' : 'down'" :describe="item.upTrend || item.downTrend" />
              </div>
              <t-icon name="chevron-right" />
            </div>
          </card>
        </t-col>
      </t-row>
    </card>
    <t-row :gutter="[16, 16]" class="card-container-margin">
      <t-col :xs="12" :xl="9">
        <card title="采购商品申请趋势" describe="(件)">
          <template #option>
            <t-date-picker
              class="card-date-picker-container"
              :default-value="LAST_7_DAYS"
              theme="primary"
              mode="date"
              range
              @change="onMaterialChange"
            />
          </template>
          <div id="lineContainer" style="width: 100%; height: 406px" />
        </card>
      </t-col>
      <t-col :xs="12" :xl="3">
        <product-card
          v-for="(item, index) in PRODUCT_LIST"
          :key="index"
          :product="item"
          :class="{ 'card-container-margin': index !== 0 }"
        />
      </t-col>
    </t-row>
    <card title="采购商品满意度分布" class="card-container-margin">
      <template #option>
        <t-date-picker
          class="card-date-picker-container"
          :default-value="LAST_7_DAYS"
          theme="primary"
          mode="date"
          range
          @change="onSatisfyChange"
        />
        <t-button class="card-date-button"> 导出数据 </t-button>
      </template>
      <div id="scatterContainer" style="width: 100%; height: 330px" />
    </card>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, onMounted, onUnmounted, watch, computed } from 'vue';
import { useStore } from 'vuex';

import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { LineChart, ScatterChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import ProductCard from '@/pages/list/card/components/Card.vue';

import { changeChartsTheme, getFolderLineDataSet, getScatterDataSet } from '../base/index';
import { PANE_LIST_DATA, PRODUCT_LIST } from './constants';
import { LAST_7_DAYS } from '@/utils/date';

import Trend from '@/components/trend/index.vue';
import Card from '@/components/card/index.vue';

echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, ScatterChart, CanvasRenderer]);

export default defineComponent({
  name: 'DashboardDetail',
  components: {
    Card,
    Trend,
    ProductCard,
  },
  setup() {
    const store = useStore();
    const chartColors = computed(() => store.state.setting.chartColors);
    // lineChart logic
    let lineContainer: HTMLElement;
    let lineChart: echarts.ECharts;
    const renderLineChart = () => {
      lineContainer = document.getElementById('lineContainer');
      lineChart = echarts.init(lineContainer);
      lineChart.setOption(getFolderLineDataSet({ ...chartColors.value }));
    };

    // scatterChart logic
    let scatterContainer: HTMLElement;
    let scatterChart: echarts.ECharts;
    const renderScatterChart = () => {
      scatterContainer = document.getElementById('scatterContainer');
      scatterChart = echarts.init(scatterContainer);
      scatterChart.setOption(getScatterDataSet({ ...chartColors.value }));
    };

    // chartSize update
    const updateContainer = () => {
      lineChart?.resize({
        width: lineContainer.clientWidth,
        height: lineContainer.clientHeight,
      });
      scatterChart?.resize({
        width: scatterContainer.clientWidth,
        height: scatterContainer.clientHeight,
      });
    };

    const renderCharts = () => {
      renderScatterChart();
      renderLineChart();
    };

    onMounted(() => {
      renderCharts();
      window.addEventListener('resize', updateContainer, false);
      nextTick(() => {
        updateContainer();
      });
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateContainer);
    });

    watch(
      () => store.state.setting.mode,
      () => {
        renderCharts();
      },
    );

    watch(
      () => store.state.setting.brandTheme,
      () => {
        changeChartsTheme([lineChart, scatterChart]);
      },
    );

    return {
      LAST_7_DAYS,
      PRODUCT_LIST,
      PANE_LIST_DATA,
      onSatisfyChange() {
        scatterChart.setOption(getScatterDataSet({ ...chartColors.value }));
      },
      onMaterialChange(value: string[]) {
        const chartColors = computed(() => store.state.setting.chartColors);
        lineChart.setOption(getFolderLineDataSet({ dateTime: value, ...chartColors.value }));
      },
    };
  },
});
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
