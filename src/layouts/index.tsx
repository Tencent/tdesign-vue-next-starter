import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import TDesignHeader from './components/Header.vue';
import TDesignBreadcrumb from './components/Breadcrumb.vue';
import TDesignFooter from './components/Footer.vue';
import TDesignSideNav from './components/SideNav';
import TDesignContent from './components/Content.vue';

import { prefix } from '@/config/global';
import TdesignSetting from './setting.vue';
import { SettingType } from '@/interface';
import '@/style/layout.less';

const name = `${prefix}-base-layout`;

export default defineComponent({
  name,
  computed: {
    ...mapGetters({
      showSidebar: 'setting/showSidebar',
      showHeader: 'setting/showHeader',
      showHeaderLogo: 'setting/showHeaderLogo',
      showSidebarLogo: 'setting/showSidebarLogo',
      showFooter: 'setting/showFooter',
      mode: 'setting/mode',
      menuRouters: 'permission/routers',
    }),
    setting(): SettingType {
      return this.$store.state.setting;
    },
    mainLayoutCls() {
      return [
        {
          't-layout--with-sider': this.showSidebar,
        },
      ];
    },
    headerMenu() {
      const { layout, splitMenu } = this.$store.state.setting;
      const { menuRouters } = this;
      if (layout === 'mix') {
        if (splitMenu) {
          return menuRouters.map((menu) => ({
            ...menu,
            children: [],
          }));
        }
        return [];
      }
      return menuRouters;
    },
    sideMenu() {
      const { layout, splitMenu } = this.$store.state.setting;
      let { menuRouters } = this;
      if (layout === 'mix' && splitMenu) {
        menuRouters.forEach((menu) => {
          if (this.$route.path.indexOf(menu.path) === 0) {
            menuRouters = menu.children.map((subMenu) => ({ ...subMenu, path: `${menu.path}/${subMenu.path}` }));
          }
        });
      }
      return menuRouters;
    },
  },
  methods: {
    renderSidebar() {
      return (
        this.showSidebar && (
          <TDesignSideNav
            showLogo={this.showSidebarLogo}
            layout={this.setting.layout}
            isFixed={this.setting.isSidebarFixed}
            menu={this.sideMenu}
            theme={this.mode}
            isCompact={this.setting.isSidebarCompact}
          />
        )
      );
    },
    renderHeader() {
      return (
        this.showHeader && (
          <TDesignHeader
            showLogo={this.showHeaderLogo}
            theme={this.mode}
            layout={this.setting.layout}
            isFixed={this.setting.isHeaderFixed}
            menu={this.headerMenu}
            isCompact={this.setting.isSidebarCompact}
          />
        )
      );
    },
    renderContent() {
      const { showBreadcrumb } = this.setting;
      const { showFooter } = this;
      return (
        <t-layout class={[`${prefix}-layout`]}>
          <t-content class={`${prefix}-content-layout`}>
            {showBreadcrumb && <TDesignBreadcrumb />}
            <TDesignContent />
          </t-content>
          {showFooter && this.renderFooter()}
        </t-layout>
      );
    },

    renderFooter() {
      return (
        <t-footer class={`${prefix}-footer-layout`}>
          <TDesignFooter />
        </t-footer>
      );
    },
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
