import { defineComponent, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { usePermissionStore, useSettingStore } from '@/store';

import TDesignHeader from './components/Header.vue';
import TDesignBreadcrumb from './components/Breadcrumb.vue';
import TDesignFooter from './components/Footer.vue';
import TDesignSideNav from './components/SideNav';
import TDesignContent from './components/Content.vue';

import { prefix } from '@/config/global';
import TdesignSetting from './setting.vue';
import '@/style/layout.less';

const name = `${prefix}-base-layout`;

export default defineComponent({
  name,
  setup() {
    const route = useRoute();
    const permissionStore = usePermissionStore();
    const settingStore = useSettingStore();
    const { routers: menuRouters } = storeToRefs(permissionStore);
    const setting = storeToRefs(settingStore);

    const mainLayoutCls = computed(() => [
      {
        't-layout--with-sider': settingStore.showSidebar,
      },
    ]);

    const headerMenu = computed(() => {
      if (settingStore.layout === 'mix') {
        if (settingStore.splitMenu) {
          console.log(menuRouters);
          return menuRouters.value.map((menu) => ({
            ...menu,
            children: [],
          }));
        }
        return [];
      }
      return menuRouters.value;
    });

    const sideMenu = computed(() => {
      const { layout, splitMenu } = settingStore;
      let newMenuRouters = menuRouters.value;
      if (layout === 'mix' && splitMenu) {
        newMenuRouters.forEach((menu) => {
          if (route.path.indexOf(menu.path) === 0) {
            newMenuRouters = menu.children.map((subMenu) => ({ ...subMenu, path: `${menu.path}/${subMenu.path}` }));
          }
        });
      }
      return newMenuRouters;
    });

    const renderSidebar = () => {
      return (
        settingStore.showSidebar && (
          <TDesignSideNav
            showLogo={settingStore.showSidebarLogo}
            layout={settingStore.layout}
            isFixed={settingStore.isSidebarFixed}
            menu={sideMenu.value}
            theme={settingStore.displayMode}
            isCompact={settingStore.isSidebarCompact}
          />
        )
      );
    };

    const renderHeader = () => {
      return (
        settingStore.showHeader && (
          <TDesignHeader
            showLogo={settingStore.showHeaderLogo}
            theme={settingStore.displayMode}
            layout={settingStore.layout}
            isFixed={settingStore.isHeaderFixed}
            menu={headerMenu.value}
            isCompact={settingStore.isSidebarCompact}
          />
        )
      );
    };

    const renderFooter = () => {
      return (
        <t-footer class={`${prefix}-footer-layout`}>
          <TDesignFooter />
        </t-footer>
      );
    };

    const renderContent = () => {
      const { showBreadcrumb, showFooter } = settingStore;
      return (
        <t-layout class={[`${prefix}-layout`]}>
          <t-content class={`${prefix}-content-layout`}>
            {showBreadcrumb && <TDesignBreadcrumb />}
            <TDesignContent />
          </t-content>
          {showFooter && renderFooter()}
        </t-layout>
      );
    };

    return {
      setting,
      mainLayoutCls,
      renderSidebar,
      renderHeader,
      renderContent,
    };
  },
  render() {
    const { layout } = this.setting;
    const header = this.renderHeader();
    const sidebar = this.renderSidebar();
    const content = this.renderContent();
    return (
      <div>
        {layout === 'side' ? (
          <t-layout class={this.mainLayoutCls} key="side">
            <t-aside>{sidebar}</t-aside>
            <t-layout>{[header, content]}</t-layout>
          </t-layout>
        ) : (
          <t-layout key="no-side">
            {header}
            <t-layout class={this.mainLayoutCls}>{[sidebar, content]}</t-layout>
          </t-layout>
        )}
        <TdesignSetting />
      </div>
    );
  },
});
