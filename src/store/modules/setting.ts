import STYLE_CONFIG from '@/config/style';

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
    state.backgroundTheme = payload.backgroundTheme;
    state.brandTheme = payload.brandTheme;
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
    return state.mode;
  },
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
