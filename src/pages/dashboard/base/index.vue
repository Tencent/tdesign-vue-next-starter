<template>
  <div>
    <t-row :gutter="[16, 16]">
      <t-col v-for="(item, index) in PANE_LIST" :key="item.title" :xs="6" :xl="3">
        <card :subtitle="item.title" :style="{ height: '168px' }" :class="{ 'main-color': index == 0 }" size="small">
          <div class="dashboard-item">
            <div class="dashboard-item-top">
              <span>{{ item.number }}</span>
            </div>
            <div class="dashboard-item-left">
              <div v-if="index === 0">
                <div
                  id="moneyContainer"
                  class="dashboard-chart-container"
                  style="width: 96px; height: 40px; margin-top: 36px"
                />
              </div>
              <div v-else-if="index === 1">
                <div
                  id="refundContainer"
                  class="dashboard-chart-container"
                  style="width: 120px; height: 42px; margin-top: 24px"
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
            style="width: 100%; height: 326px"
          />
        </card>
      </t-col>
      <t-col :xs="12" :xl="3">
        <card title="销售渠道" :describe="currentMonth">
          <div
            id="countContainer"
            ref="countContainer"
            style="width: 100%; height: 326px"
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
              <t-radio-button value="dateVal"> 月份 </t-radio-button>
              <t-radio-button value="monthVal"> 季度 </t-radio-button>
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
              <a class="t-button-link" @click="rehandleClickOp(slotProps)">操作</a>
            </template>
          </t-table>
        </card>
      </t-col>
      <t-col :xs="12" :xl="6">
        <card title="采购订单排名">
          <template #option>
            <t-radio-group default-value="dateVal">
              <t-radio-button value="dateVal"> 月份 </t-radio-button>
              <t-radio-button value="monthVal"> 季度 </t-radio-button>
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
              <a class="t-button-link" @click="rehandleClickOp(slotProps)">操作</a>
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
                @change="onWharehouseChange"
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
import { defineComponent, onMounted, watch, ref } from 'vue';
import { useStore } from 'vuex';

import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { PieChart, LineChart, BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { LAST_7_DAYS } from '@/utils/date';
import { useChart } from '@/utils/hooks';

// 导入样式
import Trend from '@/components/trend/index.vue';
import Card from '@/components/card/index.vue';
import {
  changeChartsTheme,
  constructInitDataset,
  getPieChartDataSet,
  getLineChartDataSet,
  constructInitDashbordDataset,
} from './index';

import { PANE_LIST, SALE_TEND_LIST, BUY_TEND_LIST, SALE_COLUMNS, BUY_COLUMNS } from './constants';

echarts.use([TooltipComponent, LegendComponent, PieChart, GridComponent, LineChart, BarChart, CanvasRenderer]);

const getThisMonth = (checkedValues?: string[]) => {
  let date;
  if (!checkedValues || checkedValues.length === 0) {
    date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}`;
  }
  date = new Date(checkedValues[0]);
  const date2 = new Date(checkedValues[1]);

  return `${date.getFullYear()}-${date.getMonth() + 1}  至  ${date2.getFullYear()}-${date2.getMonth() + 1}`;
};

export default defineComponent({
  name: 'DashboardBase',
  components: {
    Card,
    Trend,
  },
  setup() {
    const refundCharts = useChart('refundContainer');
    const moneyCharts = useChart('moneyContainer');
    const stokeCharts = useChart('stokeContainer');
    const monitorChart = useChart('monitorContainer');
    const countChart = useChart('countContainer');
    const initCharts = () => {
      refundCharts.value.setOption(constructInitDashbordDataset('bar'));
      moneyCharts.value.setOption(constructInitDashbordDataset('line'));
      stokeCharts.value.setOption(constructInitDataset(LAST_7_DAYS));
      monitorChart.value.setOption(getLineChartDataSet());
      countChart.value.setOption(getPieChartDataSet());
    };

    const currentMonth = ref(getThisMonth());

    onMounted(() => {
      initCharts();
    });

    const store = useStore();
    watch(
      () => store.state.setting.brandTheme,
      () => {
        changeChartsTheme([
          refundCharts.value,
          moneyCharts.value,
          stokeCharts.value,
          monitorChart.value,
          countChart.value,
        ]);
      },
    );

    return {
      currentMonth,
      LAST_7_DAYS,
      PANE_LIST,
      BUY_TEND_LIST,
      SALE_TEND_LIST,
      SALE_COLUMNS,
      BUY_COLUMNS,
      onCurrencyChange(checkedValues: string[]) {
        currentMonth.value = getThisMonth(checkedValues);
        monitorChart.value.setOption(getLineChartDataSet(checkedValues));
      },
      onWharehouseChange(checkedValues: string[]) {
        stokeCharts.value.setOption(constructInitDataset(checkedValues));
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
  background: @brand-color !important;
  color: @text-color-primary !important;

  .card-describe {
    color: @text-color-anti !important;
  }

  .dashboard-item-top span {
    color: @text-color-anti !important;
  }

  .dashboard-item-block {
    color: @text-color-anti !important;
    opacity: 0.6;
  }

  .dashboard-item-bottom {
    color: @text-color-anti !important;
  }
}
</style>
