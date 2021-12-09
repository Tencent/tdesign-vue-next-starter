<template>
  <div class="dashboard-panel-detail">
    <card title="本月采购申请情况">
      <t-row :gutter="[16, 16]">
        <t-col v-for="(item, index) in PANE_LIST_DATA" :key="index" :xs="6" :xl="3">
          <div class="dashboard-detail-container-item">
            <span>{{ item.title }}</span>
            <h1>{{ item.count }}</h1>
            <div class="dashboard-detail-container-item-text">
              <span
                >环比<trend :type="item.percent > 0 ? 'up' : 'down'" :describe="`${Math.abs(item.percent)}%`"
              /></span>
              <t-icon name="chevron-right" />
            </div>
          </div>
        </t-col>
      </t-row>
    </card>
    <t-row :gutter="16">
      <t-col :xs="12" :xl="9">
        <card title="采购商品申请趋势">
          <template #option>
            <div class="card-date-picker">
              <t-date-picker
                :default-value="LAST_7_DAYS"
                theme="primary"
                mode="date"
                range
                @change="onMaterialChange"
              />
            </div>
          </template>
          <div id="lineContainer" style="width: 100%; height: 418px" />
        </card>
      </t-col>
      <t-col :xs="12" :xl="3">
        <product-card v-for="(item, index) in PRODUCT_LIST" :key="index" :product="item" />
      </t-col>
    </t-row>
    <card title="采购商品满意度分布">
      <template #option>
        <t-date-picker
          class="card-date-picker"
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
import { defineComponent, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { LineChart, ScatterChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import ProductCard from '@/pages/list/card/components/Card.vue';

import { changeChartsTheme, getFolderLineDataSet, getScatterDataSet } from '../base/index';
import { PANE_LIST_DATA, PRODUCT_LIST } from './constants';
import { useChart } from '@/utils/hooks';
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
    const lineChart = useChart('lineContainer');
    const scatterChart = useChart('scatterContainer');

    const store = useStore();
    watch(
      () => store.state.setting.brandTheme,
      () => {
        changeChartsTheme([lineChart.value, scatterChart.value]);
      },
    );

    onMounted(() => {
      lineChart.value.setOption(getFolderLineDataSet());
      scatterChart.value.setOption(getScatterDataSet());
    });
    return {
      LAST_7_DAYS,
      PRODUCT_LIST,
      PANE_LIST_DATA,
      onSatisfyChange() {
        scatterChart.value.setOption(getScatterDataSet());
      },
      onMaterialChange(value: string[]) {
        lineChart.value.setOption(getFolderLineDataSet(value));
      },
    };
  },
});
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
