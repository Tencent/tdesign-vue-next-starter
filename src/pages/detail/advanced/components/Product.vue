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
@import '@/style/variables.less';
.operater-gap {
  margin-left: 20px;
}

.operater-block {
  position: relative;
  background-color: @bg-color-container;
  border: 1px solid @component-border;
  border-radius: 3px;

  .operater-content {
    padding: 20px 32px 24px 32px;
    height: 256px;

    .operater-title-icon {
      background: @brand-color-1;
      color: @brand-color;
      font-size: 56px;
      padding: 14px;
      border-radius: 100%;
    }

    .operater-title {
      margin-bottom: 25px;
      position: relative;

      h1 {
        display: inline-block;
        font-weight: 500;
        font-size: 24px;
        color: @text-color-primary;
      }

      &-subtitle {
        display: block;
        font-weight: 400;
        font-size: 14px;
        width: 60%;
        color: @text-color-placeholder;
      }

      &-tag {
        margin-right: 4px;
        margin-top: 8px;
        margin-left: unset;
        border: unset;
      }

      &-icon {
        position: absolute;
        top: 0px;
        right: 0px;
      }

      svg {
        circle {
          fill: @brand-color-2;
        }

        path {
          fill: @brand-color;
        }
      }
    }

    .operater-item {
      position: relative;
      padding-top: 8px;
      padding-bottom: 8px;

      &-info {
        display: inline-block;
        width: 60%;
        text-align: left;
        font-size: 14px;
        color: @text-color-placeholder;
      }

      &-icon {
        position: absolute;
        bottom: 8px;
        right: 0;
      }
    }
  }

  .operater-footer {
    position: absolute;
    width: 100%;
    bottom: 0px;
    left: 0;

    .t-progress--thin {
      display: unset;
    }

    &-percentage {
      position: absolute;
      bottom: 15px;
      right: 32px;
      color: @text-color-placeholder;
    }
  }
}
</style>
