<template>
  <header class="login-header">
    <logo-full-icon class="logo" />
    <div class="operations-container">
      <t-button theme="default" shape="square" variant="text" @click="navToGitHub">
        <t-icon name="logo-github" class="icon" />
      </t-button>
      <t-button theme="default" shape="square" variant="text" @click="navToHelper">
        <t-icon name="help-circle" class="icon" />
      </t-button>
      <t-button theme="default" shape="square" variant="text" @click="toggleSettingPanel">
        <t-icon name="setting" class="icon" />
      </t-button>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import LogoFullIcon from '@/assets/assets-logo-full.svg?component';

export default defineComponent({
  components: { LogoFullIcon },
  setup() {
    const store = useStore();
    const toggleSettingPanel = () => {
      store.commit('setting/toggleSettingPanel', true);
    };

    const navToGitHub = () => {
      window.open('https://github.com/tencent/tdesign-vue-next-starter');
    };

    const navToHelper = () => {
      window.open('http://tdesign.tencent.com/starter/docs/get-started');
    };

    return {
      toggleSettingPanel,
      navToGitHub,
      navToHelper,
    };
  },
});
</script>

<style lang="less" scoped>
@import '@/style/variables.less';
.login-header {
  height: 64px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(5px);
  color: @text-color-primary;

  .logo {
    width: 188px;
    height: 64px;
  }

  .operations-container {
    display: flex;
    align-items: center;
    .t-button {
      margin-left: 16px;
    }

    .icon {
      height: 20px;
      width: 20px;
      padding: 6px;
      box-sizing: content-box;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
