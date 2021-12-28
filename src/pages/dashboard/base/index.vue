<template>
  <div>
    <t-row :gutter="[16, 16]">
      <t-col v-for="(item, index) in PANE_LIST" :key="item.title" :xs="6" :xl="3">
        <card :subtitle="item.title" :style="{ height: '168px' }" :class="{ 'main-color': index == 0 }" size="small">
          <div class="dashboard-item">
            <div class="dashboard-item-top">
              <span :style="{ fontSize: `${resizeTime * 36}px` }">{{ item.number }}</span>
            </div>
            <div class="dashboard-item-left">
              <div v-if="index === 0">
                <div
                  id="moneyContainer"
                  class="dashboard-chart-container"
                  :style="{ width: `${resizeTime * 120}px`, height: `${resizeTime * 66}px`, marginTop: '22px' }"
                />
              </div>
              <div v-else-if="index === 1">
                <div
                  id="refundContainer"
                  class="dashboard-chart-container"
                  :style="{ width: `${resizeTime * 120}px`, height: `${resizeTime * 42}px`, marginTop: '24px' }"
                />
              </div>

              <span v-else-if="index === 2">
                <t-icon name="usergroup" />
              </span>
              <span v-else>
                <t-icon name="file" />
              </span>
            </div>
            <div class="dashboard-item-bottom">
              <div class="dashboard-item-block">
                自从上周以来
                <trend
                  class="dashboard-item-trend"
                  :type="item.upTrend ? 'up' : 'down'"
                  :is-reverse-color="index === 0"
                  :describe="item.upTrend || item.downTrend"
                />
              </div>
              <t-icon name="chevron-right" />
            </div>
          </div>
        </card>
      </t-col>
    </t-row>

    <!-- 中部图表  -->
    <t-row :gutter="16" class="row-container">
      <t-col :xs="12" :xl="9">
        <card title="统计数据" :describe="`(万元)${currentMonth}`">
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
        </card>
      </t-col>
      <t-col :xs="12" :xl="3">
        <card title="销售渠道" :describe="currentMonth">
          <div
            id="countContainer"
            ref="countContainer"
            :style="{ width: `${resizeTime * 326}px`, height: `${resizeTime * 326}px`, margin: '0 auto' }"
            class="dashboard-chart-container"
          />
        </card>
      </t-col>
    </t-row>

    <!-- 列表排名 -->
    <t-row :gutter="16" class="row-container">
      <t-col :xs="12" :xl="6">
        <card title="销售订单排名">
          <template #option>
            <t-radio-group default-value="dateVal">
              <t-radio-button value="dateVal">本周</t-radio-button>
              <t-radio-button value="monthVal">近三个月</t-radio-button>
            </t-radio-group>
          </template>
          <t-table :data="SALE_TEND_LIST" :columns="SALE_COLUMNS" row-key="productName">
            <template #index="{ rowIndex }">
              <span :class="getRankClass(rowIndex)">
                {{ rowIndex + 1 }}
              </span>
            </template>
            <template #growUp="{ row }">
              <span>
                <trend :type="row.growUp > 0 ? 'up' : 'down'" :describe="Math.abs(row.growUp)" />
              </span>
            </template>
            <template #operation="slotProps">
              <a class="t-button-link" @click="rehandleClickOp(slotProps)">详情</a>
            </template>
          </t-table>
        </card>
      </t-col>
      <t-col :xs="12" :xl="6">
        <card title="采购订单排名">
          <template #option>
            <t-radio-group default-value="dateVal">
              <t-radio-button value="dateVal">本周</t-radio-button>
              <t-radio-button value="monthVal">近三个月</t-radio-button>
            </t-radio-group>
          </template>
          <t-table :data="BUY_TEND_LIST" :columns="BUY_COLUMNS" row-key="productName">
            <template #index="{ rowIndex }">
              <span :class="getRankClass(rowIndex)">
                {{ rowIndex + 1 }}
              </span>
            </template>
            <template #growUp="{ row }">
              <trend :type="row.growUp > 0 ? 'up' : 'down'" :describe="Math.abs(row.growUp)" />
            </template>
            <template #operation="slotProps">
              <a class="t-button-link" @click="rehandleClickOp(slotProps)">详情</a>
            </template>
          </t-table>
        </card>
      </t-col>
    </t-row>

    <!-- 出入库概览 -->
    <div class="row-container overview-panel">
      <t-row>
        <t-col :xs="12" :xl="9">
          <card title="出入库概览" describe="(件)">
            <template #option>
              <t-date-picker
                class="card-date-picker-container"
                theme="primary"
                mode="date"
                range
                :default-value="LAST_7_DAYS"
                @change="onStokeDataChange"
              />
            </template>
            <div
              id="stokeContainer"
              ref="stokeContainer"
              style="width: 100%; height: 351px"
              class="dashboard-chart-container"
            />
          </card>
        </t-col>
        <t-col :xs="12" :xl="3">
          <card>
            <template #option>
              <t-button>导出数据</t-button>
            </template>
            <t-row>
              <t-col :xs="6" :xl="12">
                <card describe="本月出库总计（件）" class="inner-card" size="small">
                  <div class="dashboard-item">
                    <div class="dashboard-item-top">
                      <span>1726</span>
                    </div>
                    <div class="dashboard-item-bottom">
                      <div class="dashboard-item-block">
                        自从上周以来
                        <trend class="dashboard-item-trend" type="down" :is-reverse-color="false" describe="20.3%" />
                      </div>
                    </div>
                  </div>
                </card>
              </t-col>

              <t-col :xs="6" :xl="12">
                <card describe="本月入库总计（件）" class="inner-card" size="small">
                  <div class="dashboard-item">
                    <div class="dashboard-item-top">
                      <span>226</span>
                    </div>
                    <div class="dashboard-item-bottom">
                      <div class="dashboard-item-block">
                        自从上周以来
                        <trend class="dashboard-item-trend" type="down" :is-reverse-color="false" describe="20.3%" />
                      </div>
                    </div>
                  </div>
                </card>
              </t-col>
            </t-row>
          </card>
        </t-col>
      </t-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, watch, ref, onUnmounted, nextTick, computed } from 'vue';
import { useStore } from 'vuex';

import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { PieChart, LineChart, BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { LAST_7_DAYS } from '@/utils/date';

// 导入样式
import Trend from '@/components/trend/index.vue';
import Card from '@/components/card/index.vue';
import {
  changeChartsTheme,
  constructInitDataset,
  getPieChartDataSet,
  getLineChartDataSet,
  constructInitDashboardDataset,
} from './index';

import { PANE_LIST, SALE_TEND_LIST, BUY_TEND_LIST, SALE_COLUMNS, BUY_COLUMNS } from './constants';

echarts.use([TooltipComponent, LegendComponent, PieChart, GridComponent, LineChart, BarChart, CanvasRenderer]);

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

export default defineComponent({
  name: 'DashboardBase',
  components: {
    Card,
    Trend,
  },
  setup() {
    const store = useStore();
    const resizeTime = ref(1);

    const chartColors = computed(() => store.state.setting.chartColors);

    // moneyCharts
    let moneyContainer: HTMLElement;
    let moneyChart: echarts.ECharts;
    const renderMoneyChart = () => {
      if (!moneyContainer) {
        moneyContainer = document.getElementById('moneyContainer');
      }
      moneyChart = echarts.init(moneyContainer);
      moneyChart.setOption(constructInitDashboardDataset('line'));
    };

    // refundCharts
    let refundContainer: HTMLElement;
    let refundChart: echarts.ECharts;
    const renderRefundChart = () => {
      if (!refundContainer) {
        refundContainer = document.getElementById('refundContainer');
      }
      refundChart = echarts.init(refundContainer);
      refundChart.setOption(constructInitDashboardDataset('bar'));
    };

    // stokeCharts
    let stokeContainer: HTMLElement;
    let stokeChart: echarts.ECharts;
    const renderStokeChart = () => {
      if (!stokeContainer) {
        stokeContainer = document.getElementById('stokeContainer');
      }
      stokeChart = echarts.init(stokeContainer);
      stokeChart.setOption(constructInitDataset({ dateTime: LAST_7_DAYS, ...chartColors.value }));
    };

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
      renderMoneyChart();
      renderRefundChart();
      renderStokeChart();
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
      moneyChart.resize({
        width: resizeTime.value * 120,
        height: resizeTime.value * 66,
      });
      refundChart.resize({
        width: resizeTime.value * 120,
        height: resizeTime.value * 42,
      });
      stokeChart.resize({
        width: stokeContainer.clientWidth,
        height: stokeContainer.clientHeight,
      });
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
      () => store.state.setting.brandTheme,
      () => {
        changeChartsTheme([refundChart, stokeChart, monitorChart, countChart]);
      },
    );

    watch(
      () => store.state.setting.mode,
      () => {
        [moneyChart, refundChart, stokeChart, monitorChart, countChart].forEach((item) => {
          item.dispose();
        });

        renderCharts();
      },
    );

    return {
      resizeTime,
      currentMonth,
      LAST_7_DAYS,
      PANE_LIST,
      BUY_TEND_LIST,
      SALE_TEND_LIST,
      SALE_COLUMNS,
      BUY_COLUMNS,
      onCurrencyChange(checkedValues: string[]) {
        currentMonth.value = getThisMonth(checkedValues);
        monitorChart.setOption(getLineChartDataSet({ dateTime: checkedValues, ...chartColors.value }));
      },
      onStokeDataChange(checkedValues: string[]) {
        stokeChart.setOption(constructInitDataset({ dateTime: checkedValues, ...chartColors.value }));
      },
      rehandleClickOp(val: MouseEvent) {
        console.log(val);
      },
      getRankClass(index: number) {
        return ['dashboard-rank', { 'dashboard-rank__top': index < 3 }];
      },
    };
  },
});
</script>
<style lang="less" scoped>
@import './index.less';
</style>
<style lang="less">
@import '@/style/variables.less';

.card-container.main-color {
  background: @brand-color;
  color: @text-color-primary;

  .card-subtitle {
    color: @text-color-anti;
  }
  .card-describe {
    color: @text-color-anti;
  }

  .dashboard-item-top span {
    color: @text-color-anti;
  }

  .dashboard-item-block {
    color: @text-color-anti;
    opacity: 0.6;
  }

  .dashboard-item-bottom {
    color: @text-color-anti;
  }
}
</style>
