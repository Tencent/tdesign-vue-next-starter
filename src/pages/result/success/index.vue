<template>
  <div class="result-success">
    <t-icon class="result-success-icon" name="check-circle" />
    <div class="result-success-title">项目已创建成功</div>
    <div class="result-success-describe">可以联系负责人分发应用</div>
    <div>
      <t-button @click="() => $router.push('/form/base')"> 返回首页 </t-button>
      <t-button theme="default" @click="() => $router.push('/detail/advanced')"> 查看进度 </t-button>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ResultSuccess',
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
    color: var(--tdvns-success-color);
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
    color: var(--tdvns-text-color-primary);
    line-height: 22px;
  }
}
</style>
