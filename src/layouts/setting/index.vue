<template>
  <div>
    <dock :current-theme="currentTheme" />
    <page-config />
    <td-theme-generator :drawer-only="true" :drawer-visible="themeGeneratorVisible" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import Dock from './dock.vue';
import PageConfig from './page-config.vue';

const themeGeneratorVisible = ref(null);
const currentTheme = ref({ name: '#0052D9' });
</script>
