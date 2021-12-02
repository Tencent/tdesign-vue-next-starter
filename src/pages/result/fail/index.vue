<template>
  <card>
    <div class="result-success">
      <t-icon class="result-success-icon" name="error-circle" />
      <div class="result-success-title">项目创建失败</div>
      <div class="result-success-describe">企业微信联系检查创建者权限，或返回修改</div>
      <div>
        <t-button theme="default" @click="() => $router.push('/form/base')">返回首页</t-button>
        <t-button @click="() => $router.push('/form/base')"> 返回修改 </t-button>
      </div>
    </div>
  </card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Card from '@/components/card/index.vue';

export default defineComponent({
  name: 'ResultSuccess',
  components: { Card },
});
</script>

<style lang="less" scoped>
@import '@/style/variables.less';

.result-success {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh;
  &-icon {
    font-size: 64px;
    color: @text-color-secondary;
  }

  &-title {
    margin-top: 16px;
    font-size: 20px;
    color: @text-color-primary;
    text-align: center;
    line-height: 22px;
  }

  &-describe {
    margin: 8px 0 32px;
    font-size: 14px;
    color: @text-color-secondary;
    line-height: 22px;
  }
}
</style>
