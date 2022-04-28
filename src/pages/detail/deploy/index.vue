<template>
  <div class="detail-deploy">
    <t-row :gutter="16">
      <t-col :lg="6" :xs="12">
        <t-card title="部署趋势">
          <div class="deploy-panel-left">
            <div id="monitorContainer" style="width: 100%; height: 265px" />
          </div>
        </t-card>
      </t-col>
      <t-col :lg="6" :xs="12">
        <t-card title="告警情况">
          <template #option>
            <t-radio-group default-value="dateVal" @change="onAlertChange">
              <t-radio-button value="dateVal"> 本周 </t-radio-button>
              <t-radio-button value="monthVal"> 本月 </t-radio-button>
            </t-radio-group>
          </template>
          <div id="dataContainer" style="width: 100%; height: 265px" />
        </t-card>
      </t-col>
    </t-row>

    <!-- 项目列表 -->
    <t-card title="项目列表" class="container-base-margin-top">
      <t-table
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :hover="true"
        row-key="index"
        @sort-change="sortChange"
        @change="rehandleChange"
      >
        <template #adminName="{ row }">
          <span>
            {{ row.adminName }}
            <t-tag v-if="row.adminPhone" size="small">{{ row.adminPhone }}</t-tag>
          </span>
        </template>
        <template #op="slotProps">
          <a :class="prefix + '-link'" @click="listClick()">管理</a>
          <a :class="prefix + '-link'" @click="deleteClickOp(slotProps)">删除</a>
        </template>
        <template #op-column>
          <t-icon name="descending-order" />
        </template>
      </t-table>
    </t-card>

    <t-dialog v-model:visible="visible" header="基本信息" @confirm="onConfirm">
      <template #body>
        <div class="dialog-info-block">
          <div class="dialog-info-block">
            <div v-for="(item, index) in BASE_INFO_DATA" :key="index" class="info-item">
              <h1>{{ item.name }}</h1>
              <span
                :class="{
                  ['green']: item.type && item.type.value === 'green',
                  ['blue']: item.type && item.type.value === 'blue',
                }"
                >{{ item.value }}</span
              >
            </div>
          </div>
        </div>
      </template>
    </t-dialog>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DetailDeploy',
};
</script>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, computed } from 'vue';

import * as echarts from 'echarts/core';
import { TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { BarChart, LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useSettingStore } from '@/store';

import { getSmoothLineDataSet, get2ColBarChartDataSet } from './index';
import { BASE_INFO_DATA, TABLE_COLUMNS as columns } from './constants';
import { changeChartsTheme } from '@/utils/color';

import { prefix } from '@/config/global';
import { ResDataType } from '@/interface';
import request from '@/utils/request';

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
]);

const store = useSettingStore();

const chartColors = computed(() => store.chartColors);
const data = ref([]);
const pagination = ref({
  defaultPageSize: 10,
  total: 100,
  defaultCurrent: 1,
});

const fetchData = async () => {
  try {
    const res: ResDataType = await request.get('/api/get-project-list');
    if (res.code === 0) {
      const { list = [] } = res.data;
      data.value = list;
      pagination.value = {
        ...pagination.value,
        total: list.length,
      };
    }
  } catch (e) {
    console.log(e);
  }
};
const visible = ref(false);

// monitorChart logic
let monitorContainer: HTMLElement;
let monitorChart: echarts.ECharts;
onMounted(() => {
  monitorContainer = document.getElementById('monitorContainer');
  monitorChart = echarts.init(monitorContainer);
  monitorChart.setOption(getSmoothLineDataSet({ ...chartColors.value }));
  setInterval(() => {
    monitorChart.setOption(getSmoothLineDataSet({ ...chartColors.value }));
  }, 3000);
});

// dataChart logic
let dataContainer: HTMLElement;
let dataChart: echarts.ECharts;
onMounted(() => {
  dataContainer = document.getElementById('dataContainer');
  dataChart = echarts.init(dataContainer);
  dataChart.setOption(get2ColBarChartDataSet({ ...chartColors.value }));
});

const intervalTimer = null;

/// / chartSize update
const updateContainer = () => {
  monitorChart.resize({
    width: monitorContainer.clientWidth,
    height: monitorContainer.clientHeight,
  });
  dataChart.resize({
    width: dataContainer.clientWidth,
    height: dataContainer.clientHeight,
  });
};

onUnmounted(() => {
  window.removeEventListener('resize', updateContainer);
  clearInterval(intervalTimer);
});

const onAlertChange = () => {
  dataChart.setOption(get2ColBarChartDataSet({ ...chartColors.value }));
};

onMounted(() => {
  fetchData();
  window.addEventListener('resize', updateContainer, false);
});

watch(
  () => store.brandTheme,
  () => {
    changeChartsTheme([monitorChart, dataChart]);
  },
);

const sortChange = (val) => {
  console.log(val);
};
const rehandleChange = (changeParams, triggerAndData) => {
  console.log('统一Change', changeParams, triggerAndData);
};
const listClick = () => {
  visible.value = true;
};
const onConfirm = () => {
  visible.value = false;
};
const deleteClickOp = (e) => {
  data.value.splice(e.rowIndex, 1);
};
</script>

<style lang="less" scoped>
.detail-deploy {
  :deep(.t-card) {
    padding: 8px;
  }

  :deep(.t-card__title) {
    font-size: 20px;
    font-weight: 500;
  }
}
</style>
