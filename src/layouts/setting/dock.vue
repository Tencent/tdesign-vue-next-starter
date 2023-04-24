<template>
  <t-popup
    hide-empty-popup
    :visible="false"
    :trigger="isThemeTabVisible ? 'hover' : 'click'"
    @visible-change="handleVisibleChange"
  >
    <div
      class="dock"
      :style="{
        zIndex: 9999,
        width: operationWidth,
        transition: 'width .3s',
      }"
    >
      <div class="dock__theme-tab" :style="{ height: !isThemeTabVisible ? '0px' : '150px' }">
        <td-theme-themes v-if="isThemeTabContentDisplay" />
      </div>
      <div class="dock__operation">
        <div
          ref="btn"
          class="generator-btn"
          :style="{
            width: !isCustomizeDrawerVisible && !isPageSettingShow ? '272px' : '48px',
            marginRight: '4px',
            transition: 'width .3s',
          }"
          @click="handleClickTheme"
          @mouseleave="handleLeaveTheme"
        >
          <t-button variant="outline" shape="square" size="large">
            <template #icon>
              <component :is="PaletteIcon" />
            </template>
          </t-button>
        </div>
        <div
          class="generator-btn"
          :style="{
            width: !isCustomizeDrawerVisible ? '48px' : '272px',
            margin: '0 4px',
            transition: 'width .3s',
          }"
          @click="toggleGeneratorPanel"
        >
          <t-button variant="outline" shape="square" size="large">
            <template #icon>
              <component :is="AdjustIcon" />
            </template>
            <div v-if="isCustomizeDrawerVisible" style="margin-left: 8px">参数调节</div>
          </t-button>
        </div>
        <div class="page-setting-btn" :style="{ width: !isPageSettingShow ? '48px' : '272px', marginLeft: '4px' }">
          <t-button variant="outline" shape="square" size="large" @click="toggleSettingPanel">
            <template #icon>
              <component :is="SettingIcon" />
            </template>
            <div v-if="isPageSettingShow" style="margin-left: 8px">页面设置</div>
          </t-button>
        </div>
        <div
          v-if="isOperationDisplay"
          class="download-btn"
          :style="{ width: '48px', margin: '0 4px' }"
          @click="handleDownload"
        >
          <t-button variant="outline" shape="square" size="large">
            <template #icon>
              <component :is="CopyIcon" />
            </template>
          </t-button>
        </div>
        <div v-if="isOperationDisplay" class="recover-btn" :style="{ width: '48px', marginLeft: '4px' }">
          <t-button variant="outline" shape="square" size="large" @click="handleClickRevokeIcon">
            <template #icon>
              <component :is="RevokeIcon" />
            </template>
          </t-button>
        </div>
      </div>
    </div>
  </t-popup>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import AdjustIcon from '@/assets/assets-adjust-icon.svg';
import CopyIcon from '@/assets/assets-copy-icon.svg';
import PaletteIcon from '@/assets/assets-palette-icon.svg';
import RevokeIcon from '@/assets/assets-revoke-icon.svg';
import SettingIcon from '@/assets/assets-setting-icon.svg';
import { useSettingStore } from '@/store';

const settingStore = useSettingStore();

const isThemeTabContentDisplay = ref(false);
const isThemeTabVisible = ref(false);

const isPageSettingShow = computed(() => {
  return settingStore.showSettingPanel;
});

const isCustomizeDrawerVisible = computed(() => {
  return settingStore.showGeneratorDrawer;
});

const isOperationDisplay = computed(
  () => isCustomizeDrawerVisible.value || isPageSettingShow.value || isThemeTabContentDisplay.value,
);

const toggleSettingPanel = () => {
  settingStore.updateConfig({
    showSettingPanel: true,
    showGeneratorDrawer: false,
  });
};

const toggleGeneratorPanel = () => {
  settingStore.updateConfig({
    showGeneratorDrawer: !settingStore.showGeneratorDrawer,
    showSettingPanel: settingStore.showGeneratorDrawer,
  });
};

const operationWidth = computed(() => {
  if (isOperationDisplay.value) return '456px';
  return '400px';
});

const handleLeaveTheme = () => {
  //   this.$refs.btn.classList.add('is-mouseleave');
  //   setTimeout(() => {
  //     this.$refs.btn.classList.remove('is-mouseleave');
  //   }, 500);
};

const handleClickTheme = () => {
  isThemeTabVisible.value = true;
};
const handleVisibleChange = (visible: boolean) => {
  if (!visible) {
    isThemeTabVisible.value = false;
    isThemeTabContentDisplay.value = false;
    settingStore.updateConfig({
      showSettingPanel: false,
      showGeneratorDrawer: false,
    });
  }
};

const handleDownload = () => {
  return null;
};

const handleClickRevokeIcon = () => {
  return null;
};

watch(
  () => isThemeTabVisible.value,
  (v) => {
    setTimeout(() => {
      isThemeTabContentDisplay.value = v;
    }, 300);
  },
);
</script>

<style lang="less" scoped>
.dock {
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
