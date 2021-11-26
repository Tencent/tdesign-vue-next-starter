<template>
  <div class="operater-block operater-gap">
    <div class="operater-content">
      <div class="operater-title">
        <t-icon name="cart" class="operater-title-icon" />
        <h1>{{ data.name }}</h1>
        <div class="operater-title-subtitle">
          {{ data.subtitle }}
        </div>
        <div class="operater-title-tags">
          <t-tag class="operater-title-tag" theme="success" size="small">
            {{ data.size }}
          </t-tag>
          <t-tag class="operater-title-tag" size="small">
            {{ data.cpu }}
          </t-tag>
          <t-tag class="operater-title-tag" size="small">
            {{ data.memory }}
          </t-tag>
        </div>
      </div>
      <div class="operater-item">
        <span class="operater-item-info">{{ data.info }}</span>
        <t-icon class="operater-item-icon" name="chevron-right" size="small" style="color: rgba(0, 0, 0, 0.26)" />
      </div>
    </div>
    <div class="operater-footer">
      <span class="operater-footer-percentage">{{ data.use }} / {{ data.stock }}（台）</span>
      <t-progress
        class="operater-progress"
        theme="line"
        :percentage="(data.use / data.stock) * 100"
        :label="false"
        :color="data.use / data.stock < 0.5 ? '#E24D59' : ''"
        :track-color="data.use / data.stock < 0.5 ? '#FCD4D4' : '#D4E3FC'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
});
</script>

<style lang="less" scoped>
@import url('../index.less');
</style>
