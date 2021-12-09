<template>
  <div>
    <div class="user-panel">
      <t-row>
        <t-col class="user-left-panel" :flex="3">
          <div class="user-top">
            <div class="user-left-greeting">
              <div class="user-left-content">
                Hi，Image
                <span class="regular"> 下午好，今天是你加入鹅厂的第 100 天～</span>
              </div>
              <img src="../../assets/tencent-logo.png" class="user-left-logo" />
            </div>
            <div class="user-right-info">
              <div class="head-bar">
                <div class="title">个人信息</div>
                <t-icon name="edit" size="18" />
              </div>
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
            </div>
          </div>

          <div class="user-bottom">
            <div class="t-demo-tabs">
              <t-tabs default-value="second">
                <t-tab-panel value="first" label="内容列表">
                  <p style="padding: 25px">内容列表</p>
                </t-tab-panel>
                <t-tab-panel value="second" label="内容列表">
                  <div class="user-bottom-container">
                    <div class="head-bar">
                      <div class="title">主页访问数据<span class="unit">（次）</span></div>
                      <t-date-picker
                        class="time-picker"
                        :default-value="LAST_7_DAYS"
                        theme="primary"
                        mode="date"
                        range
                        @change="onLineChange"
                      />
                    </div>
                    <!-- <div id="lineContainer" style="width: 100%; height: 330px" /> -->
                  </div>
                </t-tab-panel>
                <t-tab-panel value="third" label="内容列表">
                  <p style="padding: 25px">内容列表</p>
                </t-tab-panel>
              </t-tabs>
            </div>
          </div>
        </t-col>

        <t-col class="user-right-panel" :flex="1">
          <div class="user-top">
            <div class="account">
              <t-avatar size="90px">T</t-avatar>
              <div class="name">My Account</div>
              <div class="position">XXG 港澳业务拓展组员工 直客销售</div>
            </div>
          </div>

          <div class="user-middle">
            <div class="head-bar">
              <div class="title">团队成员</div>
              <t-icon name="edit" size="18" />
            </div>
            <t-list :split="false">
              <t-list-item v-for="(item, index) in TEAM_MEMBERS" :key="index">
                <t-list-item-meta :image="item.avatar" :title="item.title" :description="item.description" />
              </t-list-item>
            </t-list>
          </div>

          <div class="user-bottom">
            <div class="head-bar">
              <div class="title">服务产品</div>
              <t-icon name="edit" size="18" />
            </div>
            <t-row class="content" justify="space-between">
              <t-col v-for="(item, index) in PRODUCT_LIST" :key="index" class="contract" :span="4">
                <img :src="item.logo" class="user-right-logo" />
              </t-col>
            </t-row>
          </div>
        </t-col>
      </t-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, watch, nextTick } from 'vue';
import { useStore } from 'vuex';

import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

import { LAST_7_DAYS } from '@/utils/date';
import { useChart } from '@/utils/hooks';
import { USER_INFO_LIST, TEAM_MEMBERS, PRODUCT_LIST } from './constants';
import { changeChartsTheme, getFolderLineDataSet } from '@/pages/dashboard/base/index';

echarts.use([GridComponent, TooltipComponent, LineChart, CanvasRenderer, LegendComponent]);

export default defineComponent({
  setup() {
    let lineChart;
    // nextTick(() => {
    //   lineChart = useChart('lineContainer');
    // });

    const onLineChange = (value: string[]) => {
      // lineChart.value.setOption(getFolderLineDataSet(value));
    };

    onMounted(() => {
      // lineChart.value.setOption({
      //   grid: {
      //     x: 30, // 默认是80px
      //     y: 30, // 默认是60px
      //     x2: 10, // 默认80px
      //     y2: 30, // 默认60px
      //   },
      //   ...getFolderLineDataSet(),
      // });
    });

    const store = useStore();
    watch(
      () => store.state.setting.brandTheme,
      () => {
        changeChartsTheme([lineChart.value]);
      },
    );

    return {
      LAST_7_DAYS,
      USER_INFO_LIST,
      TEAM_MEMBERS,
      PRODUCT_LIST,
      onLineChange,
    };
  },
});
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
