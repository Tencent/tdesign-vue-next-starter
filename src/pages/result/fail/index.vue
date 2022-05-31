<template>
  <div class="result-success">
    <t-icon class="result-success-icon" name="error-circle" />
    <div class="result-success-title">项目创建失败</div>
    <div class="result-success-describe">企业微信联系检查创建者权限，或返回修改</div>
    <div>
      <t-button @click="() => $router.push('/form/base')">返回修改</t-button>
      <t-button theme="default" @click="() => $router.push('/dashboard/base')">返回首页</t-button>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ResultFail',
};
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
    color: var(--tdvns-text-color-secondary);
  }

  &-title {
    margin-top: 16px;
    font-size: 20px;
    color: var(--tdvns-text-color-primary);
    text-align: center;
    line-height: 22px;
    font-weight: 500;
  }

  &-describe {
    margin: 8px 0 32px;
    font-size: 14px;
    color: var(--tdvns-text-color-secondary);
    line-height: 22px;
  }
}
</style>
