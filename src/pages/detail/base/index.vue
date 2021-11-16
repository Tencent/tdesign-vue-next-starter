<template>
  <div>
    <div class="detail-base-panel">
      <t-row class="detail-base-info" justify="space-between">
        <p class="detail-base-info-title">
          基本信息
        </p>
      </t-row>
      <div class="info-block">
        <div v-for="(item, index) in BASE_INFO_DATA" :key="index" class="info-item">
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
      <t-divider style="margin-top: 24px; margin-bottom: 23px; border-top-color: rgba(255, 255, 255, 0)" />
      <div class="update-history">
        <t-row class="detail-base-info" justify="space-between">
          <p class="detail-base-info-title">
            变更记录
          </p>
        </t-row>
        <t-steps class="detail-base-info-steps" direction="vertical" theme="dot" :current="1">
          <t-step-item title="上传合同附件" content="这里是提示文字" />
          <t-step-item title="修改合同金额" content="这里是提示文字" />
          <t-step-item title="新建合同" content="2020-12-01 15:00:00 管理员-李川操作" />
        </t-steps>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { BASE_INFO_DATA } from './constants';

export default defineComponent({
  name: 'ListBase',
  data() {
    return {
      BASE_INFO_DATA,
    };
  },
});
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
