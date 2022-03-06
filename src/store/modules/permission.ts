import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import router, { asyncRouterList } from '@/router';
import { store } from '@/store';

function filterPermissionsRouters(routes: Array<RouteRecordRaw>, roles: Array<unknown>) {
  const res = [];
  const removeRoutes = [];
  routes.forEach((route) => {
    const children = [];
    route.children?.forEach((childRouter) => {
      const roleCode = childRouter.meta?.roleCode || childRouter.name;
      if (roles.indexOf(roleCode) !== -1) {
        children.push(childRouter);
      } else {
        removeRoutes.push(childRouter);
      }
    });
    if (children.length > 0) {
      route.children = children;
      res.push(route);
    }
  });
  return { accessedRouters: res, removeRoutes };
}

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    whiteListRouters: ['/login'],
    routers: [],
    removeRoutes: [],
  }),
  getters: {
    rolesMap: (state) => {
      const roleMap = [];
      state.routers.forEach((element, index) => {
        if (element.meta) {
          roleMap.push({
            resourceType: element.meta.title,
            subResourceList: [],
          });
        } else {
          roleMap.push({
            subResourceList: [],
          });
        }
        element.children.forEach((item) => {
          roleMap[index].subResourceList.push({
            resourceName: item.meta.title,
            resourceCode: item.name,
          });
          if (!roleMap[index].resourceType) {
            roleMap[index].resourceType = item.meta.title;
          }
        });
      });
      return roleMap;
    },
  },
  actions: {
    async initRoutes(roles: Array<unknown>) {
      let accessedRouters = [];

      // 路由做减法，优化登陆后的跳转时间
      let removeRoutes = [];
      // special token
      if (roles.includes('all')) {
        accessedRouters = asyncRouterList;
      } else {
        const res = filterPermissionsRouters(asyncRouterList, roles);
        accessedRouters = res.accessedRouters;
        removeRoutes = res.removeRoutes;
      }

      this.routers = accessedRouters;
      this.removeRoutes = removeRoutes;

      removeRoutes.forEach((item: RouteRecordRaw) => {
        if (router.hasRoute(item.name)) {
          router.removeRoute(item.name);
        }
      });
    },
    async restore() {
      // 复原route,保证在登陆状态时路由全量
      this.removeRoutes.forEach((item: RouteRecordRaw) => {
        router.addRoute(item);
      });
    },
  },
});

export function getPermissionStore() {
  return usePermissionStore(store);
}
