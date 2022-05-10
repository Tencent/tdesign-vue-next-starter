<template>
  <div class="dashboard-panel-detail">
    <t-card title="本月采购申请情况" class="dashboard-detail-card">
      <t-row :gutter="[16, 16]">
        <t-col v-for="(item, index) in PANE_LIST_DATA" :key="index" :xs="6" :xl="3">
          <t-card class="dashboard-list-card" :description="item.title">
            <div class="dashboard-list-card__number">{{ item.number }}</div>
            <div class="dashboard-list-card__text">
              <div class="dashboard-list-card__text-left">
                环比
                <trend class="icon" :type="item.upTrend ? 'up' : 'down'" :describe="item.upTrend || item.downTrend" />
              </div>
              <t-icon name="chevron-right" />
            </div>
          </t-card>
        </t-col>
      </t-row>
    </t-card>
    <t-row :gutter="[16, 16]" class="row-margin">
      <t-col :xs="12" :xl="9">
        <t-card class="dashboard-detail-card" title="采购商品申请趋势" subtitle="(件)">
          <template #actions>
            <t-date-picker
              class="card-date-picker-container"
              :default-value="LAST_7_DAYS"
              theme="primary"
              mode="date"
              range
              style="width: 240px"
              @change="onMaterialChange"
            />
          </template>
          <div id="lineContainer" style="width: 100%; height: 410px" />
        </t-card>
      </t-col>
      <t-col :xs="12" :xl="3">
        <product-card
          v-for="(item, index) in PRODUCT_LIST"
          :key="index"
          :product="item"
          :class="{ 'row-margin': index !== 0 }"
        />
      </t-col>
    </t-row>
    <t-card :class="['dashboard-detail-card', 'row-margin']" title="采购商品满意度分布">
      <template #actions>
        <t-date-picker
          class="card-date-picker-container"
          :default-value="LAST_7_DAYS"
          theme="primary"
          mode="date"
          range
          style="display: inline-block; margin-right: 8px; width: 240px"
          @change="onSatisfyChange"
        />
        <t-button class="card-date-button"> 导出数据 </t-button>
      </template>
      <div id="scatterContainer" style="width: 100%; height: 330px" />
    </t-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DashboardDetail',
};
</script>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, watch, computed } from 'vue';

import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { LineChart, ScatterChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import ProductCard from '@/components/product-card/index.vue';

import { getFolderLineDataSet, getScatterDataSet } from './index';
import { PANE_LIST_DATA, PRODUCT_LIST } from './constants';
import { LAST_7_DAYS } from '@/utils/date';
import { useSettingStore } from '@/store';
import { changeChartsTheme } from '@/utils/color';

import Trend from '@/components/trend/index.vue';

echarts.use([GridComponent, LegendComponent, TooltipComponent, LineChart, ScatterChart, CanvasRenderer]);

const store = useSettingStore();
const chartColors = computed(() => store.chartColors);

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
  () => store.mode,
  () => {
    renderCharts();
  },
);

watch(
  () => store.brandTheme,
  () => {
    changeChartsTheme([lineChart, scatterChart]);
  },
);

const onSatisfyChange = () => {
  scatterChart.setOption(getScatterDataSet({ ...chartColors.value }));
};

const onMaterialChange = (value: string[]) => {
  const chartColors = computed(() => store.chartColors);
  lineChart.setOption(getFolderLineDataSet({ dateTime: value, ...chartColors.value }));
};
</script>

<style lang="less" scoped>
@import '@/style/variables.less';

.row-margin {
  margin-top: 16px;
}

// 统一增加8px;
.dashboard-detail-card {
  padding: 8px;

  :deep(.t-card__title) {
    font-size: 20px;
    font-weight: 500;
  }

  :deep(.t-card__actions) {
    display: flex;
    align-items: center;
  }
}

.dashboard-list-card {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 170px;
  padding: 8px;

  :deep(.t-card__header) {
    padding-bottom: 8px;
  }

  :deep(.t-card__body) {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &.dark {
    &:hover {
      background: var(--tdvns-gray-color-14);
      cursor: pointer;
    }
  }

  &.light {
    &:hover {
      background: var(--tdvns-gray-color-14);
      cursor: pointer;
    }
  }

  &__number {
    font-size: 36px;
    line-height: 44px;
    color: var(--tdvns-text-color-primary);
  }

  &__text {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: var(--tdvns-text-color-placeholder);
    text-align: left;
    line-height: 18px;

    &-left {
      display: flex;

      .icon {
        margin: 0 8px;
      }
    }
  }
}
</style>
