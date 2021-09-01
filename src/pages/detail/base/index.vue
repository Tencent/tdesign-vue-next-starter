<template>
  <div>
    <t-page-header> 合同基础详情 </t-page-header>
    <div :class="prefix + '-panel'">
      <div class="base-info">
        <t-row
          :class="prefix + '-operater-row'"
          justify="space-between"
        >
          <p :class="prefix + '-operater-title'">
            基本信息
          </p>
        </t-row>
        <div class="info-block">
          <div
            v-for="(item, index) in baseInfoData"
            :key="index"
            class="info-item"
          >
            <h1>{{ item.name }}</h1>
            <span
              :class="{
                ['inProgress']: item.type && item.type.value === 'inProgress',
                ['pdf']: item.type && item.type.value === 'pdf',
              }"
            >
              <i v-if="item.type && item.type.key === 'contractStatus'" />
              {{ item.value }}
            </span>
          </div>
        </div>
      </div>
      <t-divider style="margin-top: 12px" />
      <div class="update-history">
        <t-row
          :class="prefix + '-operater-row'"
          justify="space-between"
        >
          <p :class="prefix + '-operater-title'">
            变更记录
          </p>
        </t-row>
        <t-steps
          direction="vertical"
          theme="dot"
          :current="1"
        >
          <t-step-item
            title="上传合同附件"
            content="这里是提示文字"
          />
          <t-step-item
            title="修改合同金额"
            content="这里是提示文字"
          />
          <t-step-item
            title="新建合同"
            content="2020-12-01 15:00:00 管理员-李川操作"
          />
        </t-steps>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Prefix as prefix } from '@/config/global';
import model from './index';
import './index.less';

export default defineComponent({
  name: 'ListBase',
  data() {
    return {
      prefix,
      baseInfoData: model.getBaseInfoData(),
    };
  },
});

</script>
<style>

</style>
