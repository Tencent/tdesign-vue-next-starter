<template>
  <t-popup hide-empty-popup :visible="isThemeTabVisible" @visible-change="handleVisibleChange">
    <div
      class="trigger-island"
      :style="{
        zIndex: 9999,
        width: operationWidth,
        transition: 'width .3s',
      }"
    >
      <div class="trigger-island__operation">
        <div
          ref="btn"
          class="generator-btn"
          :style="{
            width: generateBtnWidth,
            marginRight: '4px',
            transition: 'width .3s',
          }"
          @click="handleClickTheme"
          @mouseleave="handleLeaveTheme"
        >
          <t-button variant="outline" shape="square" size="large">
            <template #icon>
              <palette-svg />
            </template>
            <!-- <div v-if="!isCustomizeDrawerVisible" style="margin-left: 8px">
              {{ currentTheme.name }}
            </div> -->
          </t-button>
        </div>
        <div
          class="generator-btn"
          :style="{
            width: !isCustomizeDrawerVisible ? '48px' : '272px',
            margin: '0 4px',
            transition: 'width .3s',
          }"
          @click="handleClickCustomize"
        >
          <t-button variant="outline" shape="square" size="large">
            <template #icon>
              <adjust-svg />
            </template>
            <div v-if="isCustomizeDrawerVisible" style="margin-left: 8px">主参数调节</div>
          </t-button>
        </div>
        <div class="page-setting-btn" :style="{ width: !isPageSettingShow ? '48px' : '272px', marginLeft: '4px' }">
          <t-button variant="outline" shape="square" size="large" @click="toggleSettingPanel">
            <template #icon>
              <setting-icon size="24" />
            </template>
            <div v-if="isPageSettingShow" style="margin-left: 8px">页面设置</div>
          </t-button>
        </div>
        <div
          v-if="isCustomizeDrawerVisible || isThemeTabVisible"
          class="download-btn"
          :style="{ width: '48px', margin: '0 4px' }"
          @click="handleDownload"
        >
          <t-button variant="outline" shape="square" size="large">
            <template #icon>
              <download-icon size="20" />
            </template>
          </t-button>
        </div>
        <div
          v-if="isCustomizeDrawerVisible || isThemeTabVisible"
          class="recover-btn"
          :style="{ width: '48px', marginLeft: '4px' }"
        >
          <t-button variant="outline" shape="square" size="large" @click="recoverTheme">
            <template #icon>
              <recover-svg />
            </template>
          </t-button>
        </div>
      </div>
    </div>
  </t-popup>
</template>

<script setup lang="ts">
import { DownloadIcon, SettingIcon } from 'tdesign-icons-vue-next';
import { computed, ref } from 'vue';

import { useSettingStore } from '@/store';

const settingStore = useSettingStore();

const isThemeTabVisible = ref(false);
const isCustomizeDrawerVisible = ref(false);
const isThemeTabContentDisplay = ref(false);

const toggleSettingPanel = () => {
  settingStore.updateConfig({
    showSettingPanel: true,
  });
};

const isPageSettingShow = computed(() => {
  return settingStore.showSettingPanel;
});
const operationWidth = computed(() => {
  if (isThemeTabVisible.value) return '400px';
  if (isCustomizeDrawerVisible.value) return '456px';
  return '312px';
});

const generateBtnWidth = computed(() => {
  if (isThemeTabVisible.value) return '216px';
  if (isCustomizeDrawerVisible.value) return '48px';
  return '184px';
});

const handleLeaveTheme = () => {
  //   this.$refs.btn.classList.add('is-mouseleave');
  //   setTimeout(() => {
  //     this.$refs.btn.classList.remove('is-mouseleave');
  //   }, 500);
};
const handleClickCustomize = () => {
  //   this.$emit('trigger-visible');
  //   this.isCustomizeDrawerVisible = true;
  //   this.isThemeTabVisible = false;
};
const handleClickTheme = () => {
  isThemeTabVisible.value = true;
  isCustomizeDrawerVisible.value = false;
};
const handleVisibleChange = (visible: boolean) => {
  if (!visible) isThemeTabVisible.value = visible;
};
const handleChangeTabTheme = (theme) => {
  //   this.currentTheme = theme;
  //   this.$emit('refresh-content');
  //   this.$emit('change-theme', theme);
};
const handleDownload = () => {};
const handleClickPageSettingIcon = () => {};
</script>
<!-- <script>
export default {
  props: {
    drawerVisible: Boolean,
  },

  watch: {
    drawerVisible(v) {
      if (!v) this.isCustomizeDrawerVisible = false;
    },
    isThemeTabVisible(v) {
      setTimeout(() => {
        this.isThemeTabContentDisplay = v;
      }, 300);
    },
  },
};
</script> -->

<style lang="less" scoped>
.trigger-island {
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 24px;
  width: fit-content;
  background-color: var(--bg-color-theme-transparent);
  padding: 8px;
  backdrop-filter: blur(10px);
  border-radius: 32px;
  &__theme-tab {
    transition: height 0.3s;
  }
  &__operation {
    display: flex;
  }
}
.generator-btn,
.download-btn,
.recover-btn,
.page-setting-btn {
  height: 48px;
  border-radius: 32px;
  padding: 1px;
  background: linear-gradient(
    135deg,
    var(--td-component-border),
    var(--td-component-border),
    var(--td-component-border),
    #006cfc,
    #05c4f4,
    #7ee94c
  );
  background-size: 400%;
  &.is-mouseleave {
    animation: toPure 0.5s cubic-bezier(0.38, 0, 0.24, 1);
  }
  /deep/ .t-button--variant-text:hover {
    background: var(--bg-color-container-hover);
  }
  /deep/ .t-button {
    height: 46px;
    width: 100%;
    border-radius: 24px;
    border: none;
    margin: auto;
    transition: transform 0.2s, color 0.2s;
    background-color: var(--bg-color-card);
    --ripple-color: transparent;
    color: var(--td-text-color-secondary);
  }

  &:hover {
    animation: toConic 0.5s cubic-bezier(0.38, 0, 0.24, 1) forwards;
    /deep/ .t-button {
      background-color: var(--bg-color-card);
      color: var(--text-primary);
    }
  }
}
</style>
