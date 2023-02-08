<template>
  <div class="result-success">
    <t-icon class="result-success-icon" name="check-circle" />
    <div class="result-success-title">项目已创建成功</div>
    <div class="result-success-describe">可以联系负责人分发应用</div>
    <div>
      <t-button theme="default" @click="() => $router.push('/detail/advanced')"> 查看进度 </t-button>
      <t-button @click="() => $router.push('/form/base')"> 返回首页 </t-button>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ResultSuccess',
};
</script>
<style lang="less" scoped>
.result-success {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh;

  &-icon {
    font-size: var(--td-comp-size-xxxxl);
    color: var(--td-success-color);
  }

  &-title {
    margin-top: var(--td-comp-margin-xxl);
    font: var(--td-font-title-large);
    color: var(--td-text-color-primary);
    text-align: center;
  }

  &-describe {
    margin: var(--td-comp-margin-s) 0 var(--td-comp-margin-xxxl);
    font: var(--td-font-body-medium);
    color: var(--td-text-color-secondary);
  }
}
</style>
