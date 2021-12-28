<template>
  <t-row :gutter="[24, 24]">
    <t-col :flex="3">
      <div class="user-left-greeting">
        <div>
          Hi，Image
          <span class="regular"> 下午好，今天是你加入鹅厂的第 100 天～</span>
        </div>
        <img src="@/assets/assets-tencent-logo.png" class="logo" />
      </div>

      <card class="user-info-list" size="small" title="个人信息">
        <template #option>
          <t-button theme="default" shape="square" variant="text">
            <t-icon name="edit" size="18" />
          </t-button>
        </template>
        <t-row class="content" justify="space-between">
          <t-col v-for="(item, index) in USER_INFO_LIST" :key="index" class="contract" :span="item.span || 3">
            <div class="contract-title">
              {{ item.title }}
            </div>
            <div class="contract-detail">
              {{ item.content }}
            </div>
          </t-col>
        </t-row>
      </card>

      <card class="content-container">
        <t-tabs value="second">
          <t-tab-panel value="first" label="内容列表">
            <p>内容列表</p>
          </t-tab-panel>
          <t-tab-panel value="second" label="内容列表">
            <card class="card-padding-no" title="主页访问数据" describe="（次）">
              <template #option>
                <t-date-picker
                  class="card-date-picker-container"
                  :default-value="LAST_7_DAYS"
                  theme="primary"
                  mode="date"
                  range
                  @change="onLineChange"
                />
              </template>
              <div id="lineContainer" style="width: 100%; height: 330px" />
            </card>
          </t-tab-panel>
          <t-tab-panel value="third" label="内容列表">
            <p>内容列表</p>
          </t-tab-panel>
        </t-tabs>
      </card>
    </t-col>

    <t-col :flex="1">
      <card class="user-intro">
        <t-avatar size="90px">T</t-avatar>
        <div class="name">My Account</div>
        <div class="position">XXG 港澳业务拓展组员工 直客销售</div>
      </card>

      <card title="团队成员" class="user-team" size="small">
        <template #option>
          <t-button theme="default" shape="square" variant="text">
            <t-icon name="edit" size="18" />
          </t-button>
        </template>
        <t-list :split="false">
          <t-list-item v-for="(item, index) in TEAM_MEMBERS" :key="index">
            <t-list-item-meta :image="item.avatar" :title="item.title" :description="item.description" />
          </t-list-item>
        </t-list>
      </card>

      <card title="服务产品" class="product-container" size="small">
        <template #option>
          <t-button theme="default" shape="square" variant="text">
            <t-icon name="edit" size="18" />
          </t-button>
        </template>
        <t-row class="content" :getters="16">
          <t-col v-for="(item, index) in PRODUCT_LIST" :key="index" :span="3">
            <component :is="getIcon(item)"></component>
          </t-col>
        </t-row>
      </card>
    </t-col>
  </t-row>
</template>
<script lang="ts">
import { defineComponent, nextTick, onMounted, onUnmounted, watch, computed } from 'vue';
import { useStore } from 'vuex';
import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

import { LAST_7_DAYS } from '@/utils/date';
import { USER_INFO_LIST, TEAM_MEMBERS, PRODUCT_LIST } from './constants';
import { changeChartsTheme, getFolderLineDataSet } from '@/pages/dashboard/base/index';
import ProductAIcon from '@/assets/assets-product-1.svg';
import ProductBIcon from '@/assets/assets-product-2.svg';
import ProductCIcon from '@/assets/assets-product-3.svg';
import ProductDIcon from '@/assets/assets-product-4.svg';

import Card from '@/components/card/index.vue';

echarts.use([GridComponent, TooltipComponent, LineChart, CanvasRenderer, LegendComponent]);

export default defineComponent({
  components: {
    Card,
  },
  setup() {
    let lineContainer: HTMLElement;
    let lineChart: echarts.ECharts;
    const store = useStore();
    const chartColors = computed(() => store.state.setting.chartColors);

    const onLineChange = (value) => {
      lineChart.setOption(getFolderLineDataSet(value));
    };

    const initChart = () => {
      lineContainer = document.getElementById('lineContainer');
      lineChart = echarts.init(lineContainer);
      lineChart.setOption({
        grid: {
          x: 30, // 默认是80px
          y: 30, // 默认是60px
          x2: 10, // 默认80px
          y2: 30, // 默认60px
        },
        ...getFolderLineDataSet({ ...chartColors.value }),
      });
    };

    const updateContainer = () => {
      lineChart?.resize({
        width: lineContainer.clientWidth,
        height: lineContainer.clientHeight,
      });
    };

    onMounted(() => {
      nextTick(() => {
        initChart();
      });
      window.addEventListener('resize', updateContainer, false);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateContainer);
    });

    const getIcon = (type) => {
      switch (type) {
        case 'a':
          return ProductAIcon;
        case 'b':
          return ProductBIcon;
        case 'c':
          return ProductCIcon;
        case 'd':
          return ProductDIcon;
        default:
          return ProductAIcon;
      }
    };

    watch(
      () => store.state.setting.brandTheme,
      () => {
        changeChartsTheme([lineChart]);
      },
    );

    return {
      LAST_7_DAYS,
      USER_INFO_LIST,
      TEAM_MEMBERS,
      PRODUCT_LIST,
      onLineChange,
      getIcon,
    };
  },
});
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
