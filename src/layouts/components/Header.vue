<template>
  <div :class="layoutCls">
    <t-head-menu :class="menuCls" :theme="theme" expand-type="popup" :value="active">
      <template #logo>
        <span v-if="showLogo" class="header-logo-container" @click="handleNav('/dashboard/base')">
          <tLogoFull class="t-logo" />
        </span>
        <div v-else class="header-operate-left">
          <t-button theme="default" shape="square" variant="text" @click="changeCollapsed">
            <t-icon class="collapsed-icon" name="view-list" />
          </t-button>
          <search :layout="layout" />
        </div>
      </template>
      <menu-content v-show="layout !== 'side'" class="header-menu" :nav-data="menu" />
      <template #operations>
        <div class="operations-container">
          <!-- 搜索框 -->
          <search v-if="layout !== 'side'" :layout="layout" />

          <!-- 全局通知 -->
          <notice />

          <t-tooltip placement="bottom" content="代码仓库">
            <t-button theme="default" shape="square" variant="text" @click="navToGitHub">
              <t-icon name="logo-github" />
            </t-button>
          </t-tooltip>
          <t-tooltip placement="bottom" content="帮助文档">
            <t-button theme="default" shape="square" variant="text" @click="navToHelper">
              <t-icon name="help-circle" />
            </t-button>
          </t-tooltip>
          <t-dropdown :min-column-width="135" trigger="click">
            <template #dropdown>
              <t-dropdown-menu>
                <t-dropdown-item class="operations-dropdown-container-item" @click="handleNav('/user/index')">
                  <t-icon name="user-circle"></t-icon>个人中心
                </t-dropdown-item>
                <t-dropdown-item class="operations-dropdown-container-item" @click="handleLogout">
                  <t-icon name="poweroff"></t-icon>退出登录
                </t-dropdown-item>
              </t-dropdown-menu>
            </template>
            <t-button class="header-user-btn" theme="default" variant="text">
              <template #icon>
                <t-icon class="header-user-avatar" name="user-circle" />
              </template>
              <div class="header-user-account">
                Tencent
                <t-icon name="chevron-down" />
              </div>
            </t-button>
          </t-dropdown>
          <t-tooltip placement="bottom" content="系统设置">
            <t-button theme="default" shape="square" variant="text">
              <t-icon name="setting" @click="toggleSettingPanel" />
            </t-button>
          </t-tooltip>
        </div>
      </template>
    </t-head-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

import { prefix } from '@/config/global';
import tLogoFull from '@/assets/assets-logo-full.svg?component';
import { MenuRoute } from '@/interface';

import Notice from './Notice.vue';
import Search from './Search.vue';
import MenuContent from './MenuContent';

export default defineComponent({
  components: {
    tLogoFull,
    Notice,
    Search,
    MenuContent,
  },
  props: {
    theme: {
      type: String as PropType<string>,
      default: '',
    },
    layout: {
      type: String as PropType<string>,
      default: 'top',
    },
    showLogo: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    menu: {
      type: Array as PropType<MenuRoute[]>,
      default: () => [],
    },
    isFixed: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    isCompact: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    maxLevel: {
      type: Number as PropType<number>,
      default: 3,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const toggleSettingPanel = () => {
      store.commit('setting/toggleSettingPanel', true);
    };

    const active = computed(() => {
      const route = useRoute();
      if (!route.path) {
        return '';
      }
      return route.path
        .split('/')
        .filter((item, index) => index <= props.maxLevel && index > 0)
        .map((item) => `/${item}`)
        .join('');
    });

    const showMenu = computed(() => !(props.layout === 'mix' && props.showLogo));

    const layoutCls = computed(() => [`${prefix}-header-layout`]);

    const menuCls = computed(() => {
      const { isFixed, layout, isCompact } = props;
      return [
        {
          [`${prefix}-header-menu`]: !isFixed,
          [`${prefix}-header-menu-fixed`]: isFixed,
          [`${prefix}-header-menu-fixed-side`]: layout === 'side' && isFixed,
          [`${prefix}-header-menu-fixed-side-compact`]: layout === 'side' && isFixed && isCompact,
        },
      ];
    });

    const userVisible = ref(false);
    const userVisibleChange = (value: boolean) => {
      userVisible.value = value;
    };

    const changeCollapsed = () => {
      store.commit('setting/toggleSidebarCompact');
    };
    const isSidebarCompact = computed(() => store.state.setting.isSidebarCompact);

    const handleNav = (url) => {
      router.push(url);
    };

    const handleLogout = () => {
      router.push(`/login?redirect=${router.currentRoute.value.fullPath}`);
    };

    const navToGitHub = () => {
      window.open('https://github.com/tencent/tdesign-vue-next-starter');
    };

    const navToHelper = () => {
      window.open('http://tdesign.tencent.com/starter/docs/get-started');
    };

    return {
      isSidebarCompact,
      toggleSettingPanel,
      active,
      showMenu,
      layoutCls,
      userVisible,
      userVisibleChange,
      menuCls,
      changeCollapsed,
      handleNav,
      handleLogout,
      navToGitHub,
      navToHelper,
    };
  },
});
</script>
<style lang="less">
@import '@/style/variables.less';
.@{prefix}-header {
  &-layout {
    height: 64px;
  }

  &-menu-fixed {
    position: fixed;
    top: 0;
    z-index: 10;

    &-side {
      left: 232px;
      right: 0;
      z-index: 10;
      width: auto;
      transition: all 0.3s;

      &-compact {
        left: 64px;
      }
    }
  }

  &-logo-container {
    cursor: pointer;
    display: inline-flex;
    height: 64px;
  }
}
.header-menu {
  flex: 1 1 1;
  display: inline-flex;
}

.operations-container {
  display: flex;
  align-items: center;
  margin-right: 12px;

  .t-popup__reference {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .t-button {
    margin: 0 8px;
    &.header-user-btn {
      margin: 0;
    }
  }

  .t-icon {
    font-size: 20px;
    &.general {
      margin-right: 16px;
    }
  }
}

.header-operate-left {
  display: flex;
  margin-left: 20px;
  align-items: normal;
  line-height: 0;

  .collapsed-icon {
    font-size: 20px;
  }
}

.header-logo-container {
  width: 184px;
  height: 26px;
  display: flex;
  margin-left: 24px;
  color: @text-color-primary;

  .t-logo {
    width: 100%;
    height: 100%;
    &:hover {
      cursor: pointer;
    }
  }

  &:hover {
    cursor: pointer;
  }
}

.header-user-account {
  display: inline-flex;
  align-items: center;
  color: @text-color-primary;
  .t-icon {
    margin-left: 4px;
    font-size: 16px;
  }
}

.t-head-menu__inner {
  border-bottom: 1px solid @border-level-1-color;
}

.t-menu--light {
  .header-user-account {
    color: @text-color-primary;
  }
}
.t-menu--dark {
  .t-head-menu__inner {
    border-bottom: 1px solid var(--td-gray-color-10);
  }
  .header-user-account {
    color: rgba(255, 255, 255, 0.55);
  }
  .t-button {
    --ripple-color: var(--td-gray-color-10) !important;
    &:hover {
      background: var(--td-gray-color-12) !important;
    }
  }
}

.operations-dropdown-container-item {
  width: 100%;
  display: flex;
  align-items: center;

  .t-icon {
    margin-right: 8px;
  }

  .t-dropdown__item {
    .t-dropdown__item__content {
      display: flex;
      justify-content: center;
    }
    .t-dropdown__item__content__text {
      display: flex;
      align-items: center;
      font-size: 14px;
    }
  }

  .t-dropdown__item {
    width: 100%;
    margin-bottom: 0px;
  }
  &:last-child {
    .t-dropdown__item {
      margin-bottom: 8px;
    }
  }
}
</style>
