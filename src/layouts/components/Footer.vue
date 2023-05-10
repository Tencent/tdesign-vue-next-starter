<template>
  <div :class="prefix + '-footer'">{{ setting.copyRight }}</div>
</template>

<script setup lang="ts">
import { prefix } from '@/config/global';
import { useSettingStore } from '@/store';

const setting = useSettingStore();
</script>

<style lang="less" scoped>
.@{starter-prefix}-footer {
  color: var(--td-text-color-placeholder);
  line-height: 20px;
  text-align: center;
}
</style>
