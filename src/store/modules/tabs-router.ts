import { defineStore } from 'pinia';
import { TRouterInfo, TTabRouterType } from '@/interface';
import { store } from '@/store';

const state = {
  homeRouter: { path: '/dashboard/base', routeIdx: 0, title: '仪表盘', name: 'DashboardBase', isHome: true },
  tabRouterList: [],
  isRefreshing: false,
};

export const useTabsRouterStore = defineStore('tabsRouter', {
  state: () => state,
  getters: {
    tabRouters: (state: TTabRouterType) => [state.homeRouter].concat(state.tabRouterList),
    refreshing: (state: TTabRouterType) => state.isRefreshing,
  },
  actions: {
    toggleTabRouterAlive(routeIdx: number) {
      this.isRefreshing = !this.isRefreshing;
      this.tabRouters[routeIdx].isAlive = !this.tabRouters[routeIdx].isAlive;
    },
    appendTabRouterList(newRoute: TRouterInfo) {
      if (!this.tabRouters.find((route: TRouterInfo) => route.path === newRoute.path)) {
        // eslint-disable-next-line no-param-reassign
        this.tabRouterList = this.tabRouterList.concat(newRoute);
      }
    },
    subtractCurrentTabRouter(newRoute: TRouterInfo) {
      const { routeIdx } = newRoute;
      this.tabRouterList = this.tabRouterList.slice(0, routeIdx - 1).concat(this.tabRouterList.slice(routeIdx));
    },
    subtractTabRouterBehind(newRoute: TRouterInfo) {
      const { routeIdx } = newRoute;
      this.tabRouterList = this.tabRouterList.slice(0, routeIdx);
    },
    subtractTabRouterAhead(newRoute: TRouterInfo) {
      const { routeIdx } = newRoute;
      this.tabRouterList = this.tabRouterList.slice(routeIdx - 1);
    },
    subtractTabRouterOther(newRoute: TRouterInfo) {
      const { routeIdx } = newRoute;
      this.tabRouterList = [this.tabRouterList?.[routeIdx]];
    },
    removeTabRouterList() {
      this.tabRouterList = [];
    },
    initTabRouterList(newRoutes: TRouterInfo[]) {
      newRoutes?.forEach((route: TRouterInfo) => this.appendTabRouterList(route));
    },
  },
});

export function getTabsRouterStore() {
  return useTabsRouterStore(store);
}
