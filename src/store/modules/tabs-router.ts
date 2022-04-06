import { defineStore } from 'pinia';
import { TRouterInfo, TTabRouterType } from '@/interface';
import { store } from '@/store';

const state = {
  tabRouterList: [{ path: '/dashboard/base', routeIdx: 0, title: '仪表盘', name: 'DashboardBase', isHome: true }],
  isRefreshing: false,
};

export const useTabsRouterStore = defineStore('tabsRouter', {
  state: () => state,
  getters: {
    tabRouters: (state: TTabRouterType) => state.tabRouterList,
    refreshing: (state: TTabRouterType) => state.isRefreshing,
  },
  actions: {
    toggleTabRouterAlive(routeIdx: number) {
      this.isRefreshing = !this.isRefreshing;
      this.tabRouters[routeIdx].isAlive = !this.tabRouterList[routeIdx].isAlive;
    },
    appendTabRouterList(newRoute: TRouterInfo) {
      if (!this.tabRouterList.find((route: TRouterInfo) => route.path === newRoute.path)) {
        // eslint-disable-next-line no-param-reassign
        this.tabRouterList = this.tabRouterList.concat(newRoute);
      }
    },
    subtractCurrentTabRouter(newRoute: TRouterInfo) {
      const { routeIdx } = newRoute;
      this.tabRouterList = this.tabRouterList.slice(0, routeIdx).concat(this.tabRouterList.slice(routeIdx + 1));
    },
    subtractTabRouterBehind(newRoute: TRouterInfo) {
      const { routeIdx } = newRoute;
      this.tabRouterList = this.tabRouterList.slice(0, routeIdx + 1);
    },
    subtractTabRouterAhead(newRoute: TRouterInfo) {
      const { routeIdx } = newRoute;
      this.tabRouterList = this.tabRouterList.slice(routeIdx);
    },
    subtractTabRouterOther(newRoute: TRouterInfo) {
      const { routeIdx } = newRoute;
      this.tabRouterList = [this.tabRouterList?.[routeIdx]];
    },
    removeTabRouterList() {
      this.tabRouterList = [];
    },
    initTabRouterList(newRoutes: TRouterInfo[]) {
      this.tabRouterList = newRoutes;
    },
  },
});

export function getTabsRouterStore() {
  return useTabsRouterStore(store);
}
