<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <t-drawer
    v-model:visible="showSettingPanel"
    size="348px"
    :footer="false"
    :header="false"
    :close-btn="false"
    class="setting-drawer-container"
    @close-btn-click="handleCloseDrawer"
  >
    <div class="setting-container">
      <t-form ref="form" :data="formData" label-align="left">
        <!-- 主题模式 -->
        <div class="setting-container-subgroup">
          <div class="setting-group-title">主题模式</div>
          <t-radio-group v-model="formData.mode">
            <div v-for="(item, index) in MODE_OPTIONS" :key="index" class="setting-layout-drawer">
              <div>
                <t-radio-button :key="index" :value="item.type">
                  <component :is="getModeIcon(item.type)" class="mode-img" />
                  <picked-icon v-if="formData.mode === item.type" class="picked" />
                </t-radio-button>
                <p :style="{ textAlign: 'center', marginTop: '8px' }">{{ item.text }}</p>
              </div>
            </div>
          </t-radio-group>
        </div>

        <div class="setting-container-subgroup">
          <div class="setting-group-title">导航布局</div>
          <t-radio-group v-model="formData.layout">
            <div v-for="(item, index) in LAYOUT_OPTION" :key="index" class="setting-layout-drawer">
              <t-radio-button :key="index" :value="item">
                <component :is="getLayoutIcon(item)" class="layout-img" />
                <picked-icon v-if="formData.layout === item" class="picked" />
              </t-radio-button>
            </div>
          </t-radio-group>
          <div v-show="formData.layout === 'mix'" :class="['setting-container-subgroup', 'setting-config-list']">
            <t-form-item label="分割菜单（混合模式下有效）" name="splitMenu">
              <t-switch v-model="formData.splitMenu" />
            </t-form-item>

            <t-form-item label="固定 Sidebar" name="isSidebarFixed">
              <t-switch v-model="formData.isSidebarFixed" />
            </t-form-item>
          </div>
        </div>
        <div class="setting-group-title">元素开关</div>
        <div :class="['setting-container-subgroup', 'setting-config-list']">
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
        </div>
      </t-form>
      <div class="setting-info">
        <p>请复制后手动修改配置文件: /src/config/style.ts</p>
        <t-button theme="primary" variant="text" @click="handleCopy"> 复制配置项 </t-button>
      </div>
    </div>
  </t-drawer>
</template>
<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, ref, watchEffect } from 'vue';
import useClipboard from 'vue-clipboard3';

import LayoutMixIcon from '@/assets/assets-layout-mix.svg';
import LayoutSideIcon from '@/assets/assets-layout-side.svg';
import LayoutTopIcon from '@/assets/assets-layout-top.svg';
import PickedIcon from '@/assets/assets-picked.svg';
import SettingAutoIcon from '@/assets/assets-setting-auto.svg';
import SettingDarkIcon from '@/assets/assets-setting-dark.svg';
import SettingLightIcon from '@/assets/assets-setting-light.svg';
import { DEFAULT_COLOR_OPTIONS } from '@/config/color';
import STYLE_CONFIG from '@/config/style';
import { useSettingStore } from '@/store';

const settingStore = useSettingStore();

const LAYOUT_OPTION = ['side', 'top', 'mix'];

const MODE_OPTIONS = [
  { type: 'light', text: '明亮' },
  { type: 'dark', text: '暗黑' },
  { type: 'auto', text: '跟随系统' },
];

const initStyleConfig = () => {
  const styleConfig = STYLE_CONFIG;
  for (const key in styleConfig) {
    if (Object.prototype.hasOwnProperty.call(styleConfig, key)) {
      // @ts-ignore
      styleConfig[key] = settingStore[key];
    }
  }

  return styleConfig;
};

const formData = ref({ ...initStyleConfig() });

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

const getModeIcon = (mode: string) => {
  const modeIconMap = {
    light: SettingLightIcon,
    dark: SettingDarkIcon,
    auto: SettingAutoIcon,
  };
  return modeIconMap[mode as 'light' | 'dark' | 'auto'];
};

const getLayoutIcon = (mode: string) => {
  const layoutIconMap = {
    side: LayoutSideIcon,
    top: LayoutTopIcon,
    mix: LayoutMixIcon,
  };
  return layoutIconMap[mode as 'side' | 'top' | 'mix'];
};

const handleCloseDrawer = () => {
  settingStore.updateConfig({
    showSettingPanel: false,
  });
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

watchEffect(() => {
  if (formData.value.brandTheme) settingStore.updateConfig(formData.value);
});

// 若需要在页面配置中插入轻量主题色配置 可以启用这部分代码
const isColoPickerDisplay = ref(false);

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const changeColor = (hex: string) => {
  formData.value.brandTheme = hex;
};

onMounted(() => {
  document.querySelector('.dynamic-color-btn')?.addEventListener('click', () => {
    isColoPickerDisplay.value = true;
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const dynamicColor = computed(() => {
  const isDynamic = DEFAULT_COLOR_OPTIONS.indexOf(formData.value.brandTheme) === -1;
  return isDynamic ? formData.value.brandTheme : '';
});
</script>
<!-- teleport导致drawer 内 scoped样式问题无法生效 先规避下 -->
<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="less">
.setting-drawer-container {
  .t-drawer__mask {
    background: none;
  }
  .t-drawer__body {
    padding: var(--td-comp-paddingTB-s) var(--td-comp-paddingLR-s);
    background-color: var(--td-bg-color-secondarycontainer);
  }

  .t-radio-group.t-size-m {
    min-height: 32px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .t-radio-group {
    margin: var(--td-comp-margin-m) 0;
  }

  .t-radio-group.t-size-m .t-radio-button {
    height: auto;
  }

  .setting-container {
    background-color: var(--td-bg-color-container);
    padding: var(--td-comp-paddingTB-l) var(--td-comp-paddingLR-l);
    border-radius: var(--td-radius-extraLarge);
    height: 100%;
    &-subgroup {
      margin: var(--td-comp-margin-m) 0;
    }
  }

  .setting-config-list {
    background-color: var(--td-bg-color-secondarycontainer);
    border-radius: var(--td-radius-large);
    padding: var(--td-comp-paddingTB-xs) var(--td-comp-paddingLR-xs);
    > .t-form__item {
      background-color: var(--td-bg-color-container);
      margin-bottom: var(--td-comp-margin-xs);
      padding: var(--td-comp-paddingTB-s) var(--td-comp-paddingLR-m);
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: var(--td-radius-medium);
    }
  }
  .setting-group-title {
    text-align: left;
    font: var(--td-font-title-medium);
    color: var(--td-text-color-primary);
  }

  .setting-layout-drawer {
    display: flex;
    flex-direction: column;
    align-items: center;

    .t-radio-button {
      display: inline-flex;
      max-height: 78px;
      padding: 0;
      border-radius: var(--td-radius-default);
      border: none;
      > .t-radio-button__label {
        display: inline-flex;
        position: relative;
        .mode-img,
        .layout-img {
          border-radius: 9px;
        }
        .picked {
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
    }

    .t-is-checked {
      border: none;
    }

    .t-form__controls-content {
      justify-content: end;
    }
  }

  .t-form__controls-content {
    justify-content: end;
  }

  .setting-info {
    position: absolute;
    padding: 24px;
    bottom: 0;
    left: 0;
    line-height: 20px;
    font-size: 12px;
    text-align: center;
    color: var(--td-text-color-placeholder);
    width: 100%;
    background: var(--td-bg-color-container);
  }
}
</style>
