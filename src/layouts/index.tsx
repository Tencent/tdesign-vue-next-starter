import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import TdesignHeader from './components/Header.vue';
import TdesignBreadcrumb from './components/Breadcrumb.vue';
import TdesignFooter from './components/Footer.vue';
import TdesignSideNav from './components/SideNav';
import TdesignContent from './components/Content.vue';

import { PREFIX } from '@/config/global';
import TdesignSetting from './setting.vue';
import { SettingType, ClassName } from '@/interface';
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
          <tdesign-side-nav
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
          <tdesign-header
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
        <t-layout class={[`${PREFIX}-layout`]}>
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
