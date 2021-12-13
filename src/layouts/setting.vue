<template>
  <t-drawer
    v-model:visible="showSettingPanel"
    size="458px"
    :footer="false"
    value="medium"
    header="页面配置"
    :close-btn="true"
    class="setting-drawer-container"
  >
    <div class="setting-container">
      <t-form ref="form" :data="formData" label-align="left">
        <div class="setting-group-title">主题模式</div>
        <t-radio-group v-model="formData.mode" default-vaule="dark">
          <div v-for="(item, index) in MODE_OPTIONS" :key="index" class="setting-layout-drawer">
            <t-radio-button :key="index" :value="item">
              <thumbnail :src="getThumbnailUrl(item)" />
            </t-radio-button>
          </div>
        </t-radio-group>
        <div class="setting-group-title">主题色</div>
        <t-radio-group v-model="formData.brandTheme" default-vaule="default">
          <div v-for="(item, index) in COLOR_OPTIONS" :key="index" class="setting-layout-drawer">
            <t-radio-button :key="index" :value="item" class="setting-layout-color-group">
              <color-container :value="item" />
            </t-radio-button>
          </div>
        </t-radio-group>

        <div class="setting-group-title">导航布局</div>
        <t-radio-group v-model="formData.layout" default-vaule="top">
          <div v-for="(item, index) in LAYOUT_OPTION" :key="index" class="setting-layout-drawer">
            <t-radio-button :key="index" :value="item">
              <thumbnail :src="getThumbnailUrl(item)" />
            </t-radio-button>
          </div>
        </t-radio-group>

        <t-form-item v-show="formData.layout === 'mix'" label="分割菜单（混合模式下有效）" name="splitMenu">
          <t-switch v-model="formData.splitMenu" />
        </t-form-item>

        <t-form-item v-show="formData.layout !== 'side'" label="固定 Header" name="isHeaderFixed">
          <t-switch v-model="formData.isHeaderFixed" />
        </t-form-item>
        <t-form-item v-show="formData.layout !== 'top'" label="固定 Sidebar" name="isSidebarFixed">
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
        <t-form-item v-show="formData.showFooter && !formData.isSidebarFixed" label="footer 内收" name="footerPosition">
          <t-switch v-model="formData.isFooterAside" />
        </t-form-item>
      </t-form>
      <div class="setting-info">
        <p>请复制后手动修改配置文件: /src/config/style.js</p>
        <t-button theme="primary" variant="text" @click="handleCopy"> 复制配置项 </t-button>
      </div>
    </div>
  </t-drawer>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { MessagePlugin } from 'tdesign-vue-next';
import STYLE_CONFIG from '@/config/style';

import Thumbnail from '@/components/thumbnail/index.vue';
import ColorContainer from '@/components/color/index.vue';

const LAYOUT_OPTION = ['side', 'top', 'mix'];
const COLOR_OPTIONS = ['default', 'purple', 'cyan', 'green', 'yellow', 'orange', 'red', 'pink'];
const MODE_OPTIONS = ['light', 'dark', 'auto'];

export default defineComponent({
  name: 'DefaultLayoutSetting',
  components: { Thumbnail, ColorContainer },
  setup() {
    const formData = ref({ ...STYLE_CONFIG });
    const store = useStore();

    const showSettingPanel = computed({
      get() {
        return store.state.setting.showSettingPanel;
      },
      set(newVal) {
        store.commit('setting/toggleSettingPanel', newVal);
      },
    });

    const handleCopy = () => {
      MessagePlugin.closeAll();
      MessagePlugin.success('复制成功');
    };
    return {
      MODE_OPTIONS,
      LAYOUT_OPTION,
      COLOR_OPTIONS,
      formData,
      showSettingPanel,
      handleCopy,
      getThumbnailUrl(name: string): string {
        return `https://tdesign.gtimg.com/tdesign-pro/setting/${name}.png`;
      },
    };
  },
  watch: {
    formData: {
      handler(newVal) {
        this.$store.dispatch('setting/changeTheme', newVal);
      },
      deep: true,
    },
  },
});
</script>
<style lang="less">
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
  width: 42px;
  height: 42px;
  justify-content: center;
  align-items: center;
  border-radius: 50% !important;
  border: 2px solid transparent !important;

  .t-radio-button__label {
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
  color: @text-color-primary;
}

.setting-link {
  cursor: pointer;
  color: @brand-color;
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
  color: @text-color-placeholder;
  width: 100%;
  background: @bg-color-container;
}

.setting-drawer-container {
  .setting-container {
    padding-bottom: 100px;
  }
  .t-radio-group.t-radio-group-medium {
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

    .t-radio-button {
      display: inline-flex;
      max-height: 78px;
      padding: 6px !important;
      border-radius: @border-radius;
      border: 2px solid #e3e6eb;
      > .t-radio-button__label {
        display: inline-flex;
      }
    }

    .t-is-checked {
      border: 2px solid @brand-color !important;
    }

    .t-form__controls--content {
      justify-content: end;
    }
  }

  .t-form__controls--content {
    justify-content: end;
  }
}

.setting-route-theme {
  .t-form__label {
    min-width: 310px !important;
    color: @text-color-secondary;
  }
}

.setting-color-theme {
  .setting-layout-drawer {
    .t-radio-button {
      height: 32px;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
