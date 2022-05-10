<template>
  <t-drawer
    v-model:visible="showSettingPanel"
    size="408px"
    :footer="false"
    header="页面配置"
    :close-btn="true"
    class="setting-drawer-container"
    @close-btn-click="handleCloseDrawer"
  >
    <div class="setting-container">
      <t-form ref="form" :data="formData" label-align="left">
        <div class="setting-group-title">主题模式</div>
        <t-radio-group v-model="formData.mode">
          <div v-for="(item, index) in MODE_OPTIONS" :key="index" class="setting-layout-drawer">
            <div>
              <t-radio-button :key="index" :value="item.type"
                ><component :is="getModeIcon(item.type)"
              /></t-radio-button>
              <p :style="{ textAlign: 'center', marginTop: '8px' }">{{ item.text }}</p>
            </div>
          </div>
        </t-radio-group>
        <div class="setting-group-title">主题色</div>
        <t-radio-group v-model="formData.brandTheme">
          <div
            v-for="(item, index) in COLOR_OPTIONS.slice(0, COLOR_OPTIONS.length - 1)"
            :key="index"
            class="setting-layout-drawer"
          >
            <t-radio-button :key="index" :value="item" class="setting-layout-color-group">
              <color-container :value="item" />
            </t-radio-button>
          </div>
          <div class="setting-layout-drawer">
            <t-popup
              destroy-on-close
              expand-animation
              placement="bottom-right"
              trigger="click"
              :visible="isColoPickerDisplay"
              :overlay-style="{ padding: 0 }"
              @visible-change="onPopupVisibleChange"
            >
              <template #content>
                <t-color-picker-panel
                  :on-change="changeColor"
                  :color-modes="['monochrome']"
                  format="HEX"
                  :swatch-colors="[]"
                />
              </template>
              <t-radio-button
                :value="COLOR_OPTIONS[COLOR_OPTIONS.length - 1]"
                class="setting-layout-color-group dynamic-color-btn"
              >
                <ColorContainer :value="COLOR_OPTIONS[COLOR_OPTIONS.length - 1]" />
              </t-radio-button>
            </t-popup>
          </div>
        </t-radio-group>

        <div class="setting-group-title">导航布局</div>
        <t-radio-group v-model="formData.layout">
          <div v-for="(item, index) in LAYOUT_OPTION" :key="index" class="setting-layout-drawer">
            <t-radio-button :key="index" :value="item">
              <Thumbnail :src="getThumbnailUrl(item)" />
            </t-radio-button>
          </div>
        </t-radio-group>

        <t-form-item v-show="formData.layout === 'mix'" label="分割菜单（混合模式下有效）" name="splitMenu">
          <t-switch v-model="formData.splitMenu" />
        </t-form-item>

        <t-form-item v-show="formData.layout === 'mix'" label="固定 Sidebar" name="isSidebarFixed">
          <t-switch v-model="formData.isSidebarFixed" />
        </t-form-item>

        <div class="setting-group-title">元素开关</div>
        <t-form-item v-show="formData.layout === 'side'" label="显示 Header" name="showHeader">
          <t-switch v-model="formData.showHeader" />
        </t-form-item>
        <t-form-item label="显示 Breadcrumbs" name="showBreadcrumb">
          <t-switch v-model="formData.showBreadcrumb" />
        </t-form-item>
        <t-form-item label="显示 Footer" name="showFooter">
          <t-switch v-model="formData.showFooter" />
        </t-form-item>
        <t-form-item label="使用 多标签Tab页" name="isUseTabsRouter">
          <t-switch v-model="formData.isUseTabsRouter"></t-switch>
        </t-form-item>
      </t-form>
      <div class="setting-info">
        <p>请复制后手动修改配置文件: /src/config/style.ts</p>
        <t-button theme="primary" variant="text" @click="handleCopy"> 复制配置项 </t-button>
      </div>
    </div>
  </t-drawer>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue';
import { MessagePlugin, PopupVisibleChangeContext } from 'tdesign-vue-next';
import { Color } from 'tvision-color';
import useClipboard from 'vue-clipboard3';

import { useSettingStore } from '@/store';
import Thumbnail from '@/components/thumbnail/index.vue';
import ColorContainer from '@/components/color/index.vue';

import STYLE_CONFIG from '@/config/style';
import { insertThemeStylesheet, generateColorMap } from '@/config/color';

import SettingDarkIcon from '@/assets/assets-setting-dark.svg';
import SettingLightIcon from '@/assets/assets-setting-light.svg';
import SettingAutoIcon from '@/assets/assets-setting-auto.svg';

const settingStore = useSettingStore();

const LAYOUT_OPTION = ['side', 'top', 'mix'];
const COLOR_OPTIONS = ['default', 'cyan', 'green', 'yellow', 'orange', 'red', 'pink', 'purple', 'dynamic'];
const MODE_OPTIONS = [
  { type: 'light', text: '明亮' },
  { type: 'dark', text: '暗黑' },
  { type: 'auto', text: '跟随系统' },
];

const formData = ref({ ...STYLE_CONFIG });
const isColoPickerDisplay = ref(false);

const showSettingPanel = computed({
  get() {
    return settingStore.showSettingPanel;
  },
  set(newVal: boolean) {
    settingStore.updateConfig({
      showSettingPanel: newVal,
    });
  },
});

const changeColor = (hex: string) => {
  const newPalette = Color.getPaletteByGradation({
    colors: [hex],
    step: 10,
  })[0];
  const { mode } = settingStore;
  const colorMap = generateColorMap(hex, newPalette, mode as 'light' | 'dark');

  settingStore.addColor({ [hex]: colorMap });
  settingStore.updateConfig({ ...formData.value, brandTheme: hex });
  insertThemeStylesheet(hex, colorMap, mode as 'light' | 'dark');
};

onMounted(() => {
  document.querySelector('.dynamic-color-btn').addEventListener('click', () => {
    isColoPickerDisplay.value = true;
  });
});

const onPopupVisibleChange = (visible: boolean, context: PopupVisibleChangeContext) => {
  if (!visible && context.trigger === 'document') {
    isColoPickerDisplay.value = visible;
  }
};

const handleCopy = () => {
  const text = JSON.stringify(formData.value, null, 4);
  const { toClipboard } = useClipboard();
  toClipboard(text)
    .then(() => {
      MessagePlugin.closeAll();
      MessagePlugin.success('复制成功');
    })
    .catch(() => {
      MessagePlugin.closeAll();
      MessagePlugin.error('复制失败');
    });
};
const getModeIcon = (mode: string) => {
  if (mode === 'light') {
    return SettingLightIcon;
  }
  if (mode === 'dark') {
    return SettingDarkIcon;
  }
  return SettingAutoIcon;
};

const handleCloseDrawer = () => {
  settingStore.updateConfig({
    showSettingPanel: false,
  });
};

const getThumbnailUrl = (name: string): string => {
  return `https://tdesign.gtimg.com/tdesign-pro/setting/${name}.png`;
};

watchEffect(() => {
  settingStore.updateConfig(formData.value);
});
</script>
<style lang="less" scoped>
@import '@/style/variables';

.tdesign-setting {
  z-index: 100;
  position: fixed;
  bottom: 200px;
  right: 0;
  transition: transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1), visibility 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  height: 40px;
  width: 40px;
  border-radius: 20px 0 0 20px;
  transition: all 0.3s;

  .t-icon {
    margin-left: 8px;
  }

  .tdesign-setting-text {
    font-size: 12px;
    display: none;
  }

  &:hover {
    width: 96px;

    .tdesign-setting-text {
      display: inline-block;
    }
  }
}

.setting-layout-color-group {
  display: inline-flex;
  width: 36px;
  height: 36px;
  justify-content: center;
  align-items: center;
  border-radius: 50% !important;
  padding: 6px !important;
  border: 2px solid transparent !important;

  > .t-radio-button__label {
    display: inline-flex;
  }
}

.tdesign-setting-close {
  position: fixed;
  bottom: 200px;
  right: 300px;
}

.setting-group-title {
  font-size: 14px;
  line-height: 22px;
  margin: 32px 0 24px 0;
  text-align: left;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: 500;
  color: var(--tdvns-text-color-primary);
}

.setting-link {
  cursor: pointer;
  color: var(--tdvns-brand-color);
  margin-bottom: 8px;
}

.setting-info {
  position: absolute;
  padding: 24px;
  bottom: 0;
  left: 0;
  line-height: 20px;
  font-size: 12px;
  text-align: center;
  color: var(--tdvns-text-color-placeholder);
  width: 100%;
  background: var(--tdvns-bg-color-container);
}

.setting-drawer-container {
  .setting-container {
    padding-bottom: 100px;
  }
  :deep(.t-radio-group.t-size-m) {
    min-height: 32px;
    width: 100%;
    height: auto;
    justify-content: space-between;
    align-items: center;
  }

  .setting-layout-drawer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16px;

    :deep(.t-radio-button) {
      display: inline-flex;
      max-height: 78px;
      padding: 8px;
      border-radius: var(--tdvns-border-radius);
      border: 2px solid #e3e6eb;
      > .t-radio-button__label {
        display: inline-flex;
      }
    }

    :deep(.t-is-checked) {
      border: 2px solid var(--tdvns-brand-color) !important;
    }

    :deep(.t-form__controls-content) {
      justify-content: end;
    }
  }

  :deep(.t-form__controls-content) {
    justify-content: end;
  }
}

.setting-route-theme {
  :deep(.t-form__label) {
    min-width: 310px !important;
    color: var(--tdvns-text-color-secondary);
  }
}

.setting-color-theme {
  .setting-layout-drawer {
    :deep(.t-radio-button) {
      height: 32px;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
