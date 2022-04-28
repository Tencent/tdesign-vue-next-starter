<template>
  <t-row :gutter="16" class="row-container">
    <t-col :xs="12" :xl="9">
      <t-card title="统计数据" :subtitle="`(万元)${currentMonth}`" class="dashboard-chart-card">
        <template #option>
          <div class="dashboard-chart-title-container">
            <t-date-picker
              class="card-date-picker-container"
              theme="primary"
              mode="date"
              range
              :default-value="LAST_7_DAYS"
              @change="onCurrencyChange"
            />
          </div>
        </template>
        <div
          id="monitorContainer"
          ref="monitorContainer"
          class="dashboard-chart-container"
          :style="{ width: '100%', height: `${resizeTime * 326}px` }"
        />
      </t-card>
    </t-col>
    <t-col :xs="12" :xl="3">
      <t-card title="销售渠道" :subtitle="currentMonth" class="dashboard-chart-card">
        <div
          id="countContainer"
          ref="countContainer"
          :style="{ width: `${resizeTime * 326}px`, height: `${resizeTime * 326}px`, margin: '0 auto' }"
          class="dashboard-chart-container"
        />
      </t-card>
    </t-col>
  </t-row>
</template>

<script setup lang="ts">
import { onMounted, watch, ref, onUnmounted, nextTick, computed } from 'vue';

import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { PieChart, LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useSettingStore } from '@/store';
import { LAST_7_DAYS } from '@/utils/date';
import { changeChartsTheme } from '@/utils/color';

import { getPieChartDataSet, getLineChartDataSet } from '../index';

echarts.use([TooltipComponent, LegendComponent, PieChart, GridComponent, LineChart, CanvasRenderer]);

const getThisMonth = (checkedValues?: string[]) => {
  let date: Date;
  if (!checkedValues || checkedValues.length === 0) {
    date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}`;
  }
  date = new Date(checkedValues[0]);
  const date2 = new Date(checkedValues[1]);

  const startMonth = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const endMonth = date2.getMonth() + 1 > 9 ? date2.getMonth() + 1 : `0${date2.getMonth() + 1}`;
  return `${date.getFullYear()}-${startMonth}  至  ${date2.getFullYear()}-${endMonth}`;
};

const store = useSettingStore();
const resizeTime = ref(1);

const chartColors = computed(() => store.chartColors);

// monitorChart
let monitorContainer: HTMLElement;
let monitorChart: echarts.ECharts;
const renderMonitorChart = () => {
  if (!monitorContainer) {
    monitorContainer = document.getElementById('monitorContainer');
  }
  monitorChart = echarts.init(monitorContainer);
  monitorChart.setOption(getLineChartDataSet({ ...chartColors.value }));
};

// monitorChart
let countContainer: HTMLElement;
let countChart: echarts.ECharts;
const renderCountChart = () => {
  if (!countContainer) {
    countContainer = document.getElementById('countContainer');
  }
  countChart = echarts.init(countContainer);
  countChart.setOption(getPieChartDataSet(chartColors.value));
};

const renderCharts = () => {
  renderMonitorChart();
  renderCountChart();
};

// chartSize update
const updateContainer = () => {
  if (document.documentElement.clientWidth >= 1400 && document.documentElement.clientWidth < 1920) {
    resizeTime.value = Number((document.documentElement.clientWidth / 2080).toFixed(2));
  } else if (document.documentElement.clientWidth < 1080) {
    resizeTime.value = Number((document.documentElement.clientWidth / 1080).toFixed(2));
  } else {
    resizeTime.value = 1;
  }

  monitorChart.resize({
    width: monitorContainer.clientWidth,
    height: resizeTime.value * 326,
  });
  countChart.resize({
    width: resizeTime.value * 326,
    height: resizeTime.value * 326,
  });
};

onMounted(() => {
  renderCharts();
  nextTick(() => {
    updateContainer();
  });
  window.addEventListener('resize', updateContainer, false);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateContainer);
});

const currentMonth = ref(getThisMonth());

watch(
  () => store.brandTheme,
  () => {
    changeChartsTheme([monitorChart, countChart]);
  },
);

watch(
  () => store.mode,
  () => {
    [monitorChart, countChart].forEach((item) => {
      item.dispose();
    });

    renderCharts();
  },
);

const onCurrencyChange = (checkedValues: string[]) => {
  currentMonth.value = getThisMonth(checkedValues);
  monitorChart.setOption(getLineChartDataSet({ dateTime: checkedValues, ...chartColors.value }));
};
</script>

<style lang="less" scoped>
.dashboard-chart-card {
  padding: 8px;

  :deep(.t-card__header) {
    padding-bottom: 24px;
  }

  :deep(.t-card__title) {
    font-size: 20px;
    font-weight: 500;
  }
}
</style>
