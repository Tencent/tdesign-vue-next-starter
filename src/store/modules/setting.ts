import STYLE_CONFIG from '@/config/style';
import MENU_CONFIG from '@/config/routes';

// 定义的state初始值
const state = {
  ...STYLE_CONFIG,
};

// 定义的state的初始值方法，传入state或者额外的方法，然后利用vuex的双向数据驱动进行值的改变
// 可通过this.$store.commit(' ')调用，但是触发的是同步事件
const mutations = {
  update(state, payload) {
    // eslint-disable-next-line no-param-reassign
    state.showBreadcrumb = payload.showBreadcrumb;
    state.theme = payload.theme;
    state.layout = payload.layout;
    state.isSidebarCompact = payload.isSidebarCompact;
    state.logoPosition = payload.logoPosition;
    state.splitMenu = payload.splitMenu;
    state.isFooterAside = payload.isFooterAside;
    state.isSidebarFixed = payload.isSidebarFixed;
    state.isHeaderFixed = payload.isHeaderFixed;
    state.showHeader = payload.showHeader;
  },
  toggleSidebarCompact(state) {
    state.isSidebarCompact = !state.isSidebarCompact;
  },
  showSidebarCompact(state, payload) {
    state.isSidebarCompact = payload;
  },
};

const getters = {
  showHeader: state => state.showHeader,
  showSidebar: state => state.layout !== 'top',
  showSidebarLogo: state => state.layout === 'side',
  showHeaderLogo: state => state.layout !== 'side',
  headerMenu: (state) => {
    if (state.layout === 'mix') {
      if (state.splitMenu) {
        return MENU_CONFIG.map(menu => ({
          ...menu,
          children: [],
        }));
      }
      return [];
    }
    return MENU_CONFIG;
  },
  sideMenu: (state, getters, rootState) => {
    if (state.layout === 'mix' && state.splitMenu) {
      let index;
      for (index = 0; index < MENU_CONFIG.length; index++) {
        const item = MENU_CONFIG[index];
        if (item.children && item.children.length > 0) {
          if (rootState.route.path.indexOf(item.path) === 0) {
            return item.children.map(menuRouter => ({ ...menuRouter, path: `${item.path}/${menuRouter.path}` }));
          }
        }
      }
    }
    return MENU_CONFIG;
  },
  showAsideFooter: (state) => {
    if (state.layout === 'mix' && !state.isSidebarFixed) {
      return state.showFooter && state.isAsideFooter;
    }
    return state.showFooter;
  },

  showMainFooter: (state) => {
    if (state.layout === 'mix' && !state.isSidebarFixed) {
      return state.showFooter && !state.isAsideFooter;
    }
    return false;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
