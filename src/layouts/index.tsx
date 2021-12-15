import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import TdesignHeader from './components/Header.vue';
import TdesignBreadcrumb from './components/Breadcrumb.vue';
import TdesignFooter from './components/Footer.vue';
import TdesignSideNav from './components/SideNav';
import TdesignContent from './components/Content.vue';

import { PREFIX } from '@/config/global';
import TdesignSetting from './setting.vue';
import { ModeType, SettingType, ClassName } from '@/interface';
import '@/style/layout.less';

const name = `${PREFIX}-base-layout`;

export default defineComponent({
  name,
  components: {
    TdesignHeader,
    TdesignFooter,
    TdesignSideNav,
    TdesignSetting,
    TdesignBreadcrumb,
    TdesignContent,
  },
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
    mainLayoutCls(): ClassName {
      return [
        {
          't-layout-has-sider': this.showSidebar,
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
      const { menuRouters } = this;
      if (layout === 'mix' && splitMenu) {
        let index;
        for (index = 0; index < menuRouters.length; index++) {
          const item = menuRouters[index];
          if (item.children && item.children.length > 0) {
            return item.children.map((menuRouter) => ({ ...menuRouter, path: `${item.path}/${menuRouter.path}` }));
          }
        }
      }
      return menuRouters;
    },
  },
  methods: {
    getNavTheme(mode: ModeType, layout: string, type: string): string {
      if (mode === 'dark') {
        return 'dark';
      }
      if (type.includes(layout)) {
        return 'dark';
      }
      return this.mode;
    },
    renderSidebar() {
      // const theme =
      //   this.setting.mode === 'dark' ? 'dark' : this.setting.layout === 'mix' ? 'light' : this.setting.theme;
      // menu 组件最多支持 3级菜单
      const theme = this.getNavTheme(this.setting.mode, this.setting.layout, ['side']);
      return (
        this.showSidebar && (
          <tdesign-side-nav
            showLogo={this.showSidebarLogo}
            layout={this.setting.layout}
            isFixed={this.setting.isSidebarFixed}
            menu={this.sideMenu}
            theme={theme}
            isCompact={this.setting.isSidebarCompact}
          />
        )
      );
    },
    renderHeader() {
      const theme = this.getNavTheme(this.setting.mode, this.setting.layout, ['mix', 'top']);
      return (
        this.showHeader && (
          <tdesign-header
            showLogo={this.showHeaderLogo}
            theme={theme}
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
        <t-layout class={[`${PREFIX}-layout`, 'narrow-scrollbar']}>
          <t-content class={`${PREFIX}-content-layout`}>
            {showBreadcrumb && <tdesign-breadcrumb />}
            <TdesignContent />
          </t-content>
          {showFooter && this.renderFooter()}
        </t-layout>
      );
    },

    renderFooter() {
      return (
        <t-footer class={`${PREFIX}-footer-layout`}>
          <tdesign-footer />
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
      <div class={`${PREFIX}-wrapper`}>
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
        <tdesign-setting />
      </div>
    );
  },
});
