<template>
  <result title="浏览器不兼容" type="ie" tip="抱歉，您正在使用的浏览器版本过低，无法打开当前网页。">
    <div class="result-slot-container">
      <t-button class="result-button" @click="() => $router.push('/')">返回首页</t-button>
      <div class="recommend-container">
        <div>TDesign Starter 推荐以下主流浏览器</div>
        <div class="recommend-browser">
          <div>
            <thumbnail class="browser-icon" url="https://tdesign.gtimg.com/starter/result-page/chorme.png" />
            <div>Chrome</div>
          </div>
          <div>
            <thumbnail class="browser-icon" url="https://tdesign.gtimg.com/starter/result-page/qq-browser.png" />
            <div>QQ Browser</div>
          </div>
        </div>
      </div>
    </div>
  </result>
</template>
<script lang="ts">
export default {
  name: 'ResultBrowserIncompatible',
};
</script>
<script setup lang="ts">
import Result from '@/components/result/index.vue';
import Thumbnail from '@/components/thumbnail/index.vue';
</script>

<style lang="less" scoped>
.result-slot-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: var(--td-text-color-secondary);
  height: 80vh;
  max-height: 240px;
}

.recommend-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--td-comp-paddingTB-xl) var(--td-comp-paddingLR-xxl);
  width: 640px;
  background: var(--td-bg-color-container);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: var(--td-radius-medium);
}

.recommend-browser {
  display: flex;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  > div + div {
    margin-left: var(--td-comp-margin-xxxl);
  }
}

.browser-icon {
  width: var(--td-comp-size-xl);
  height: var(--td-comp-size-xl);
  margin-bottom: var(--td-comp-margin-s);
}
</style>
