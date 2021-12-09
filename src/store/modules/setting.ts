import STYLE_CONFIG from '@/config/style';
import MENU_CONFIG from '@/config/routes';

// 定义的state初始值
const state = {
  ...STYLE_CONFIG,
  showSettingPanel: false,
};

const mutations = {
  update(state, payload) {
    state.showBreadcrumb = payload.showBreadcrumb;
    state.mode = payload.mode;
    state.layout = payload.layout;
    state.isSidebarCompact = payload.isSidebarCompact;
    state.logoPosition = payload.logoPosition;
    state.splitMenu = payload.splitMenu;
    state.isFooterAside = payload.isFooterAside;
    state.isSidebarFixed = payload.isSidebarFixed;
    state.isHeaderFixed = payload.isHeaderFixed;
    state.showHeader = payload.showHeader;
    state.showFooter = payload.showFooter;
  },
  toggleSidebarCompact(state) {
    state.isSidebarCompact = !state.isSidebarCompact;
  },
  showSidebarCompact(state, payload) {
    state.isSidebarCompact = payload;
  },
  toggleSettingPanel(state, payload) {
    state.showSettingPanel = payload;
  },
};

const getters = {
  showHeader: (state) => state.showHeader,
  showSidebar: (state) => state.layout !== 'top',
  showSidebarLogo: (state) => state.layout === 'side',
  showHeaderLogo: (state) => state.layout !== 'side',
  headerMenu: (state) => {
    if (state.layout === 'mix') {
      if (state.splitMenu) {
        return MENU_CONFIG.map((menu) => ({
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
            return item.children.map((menuRouter) => ({ ...menuRouter, path: `${item.path}/${menuRouter.path}` }));
          }
        }
      }
    }
    return MENU_CONFIG;
  },
  showFooter: (state) => state.showFooter,
  showSettingBtn: (state) => !state.showHeader,
  mode: (state) => {
    if (state.mode === 'auto') {
      const media = window.matchMedia('(prefers-color-scheme:dark)');
      if (media.matches) {
        return 'dark';
      }
      return 'light';
    }
    return state.mode
  }
};

const actions = {
  async changeTheme({ commit, dispatch }, payload) {
    dispatch('changeMode', payload);
    dispatch('changeBrandTheme', payload);
    commit('update', payload);
  },
  changeMode({ state }, payload) {
    let theme = payload.mode;
    if (payload.mode === 'auto') {
      const media = window.matchMedia('(prefers-color-scheme:dark)');
      if (media.matches) {
        theme = 'dark';
      } else {
        theme = 'light';
      }
    }
    if (theme !== state.mode) {
      document.documentElement.setAttribute('theme-mode', theme === 'dark' ? 'dark' : '');
    }
  },
  changeBrandTheme({ state }, payload) {
    if (payload.brand !== state.brandTheme) {
      document.documentElement.setAttribute('theme-color', payload.brandTheme);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
