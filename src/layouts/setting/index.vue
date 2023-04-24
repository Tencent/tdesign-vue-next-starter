<template>
  <div>
    <dock :current-theme="currentTheme" />
    <!-- 页面配置 -->
    <page-config />
    <!-- 主题皮肤配置 -->
    <theme-config />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import Dock from './dock.vue';
import PageConfig from './page-config.vue';
import ThemeConfig from './theme-config.vue';

const currentTheme = ref({ name: '#0052D9' });
</script>
