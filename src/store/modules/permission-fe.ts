// 前端 roles 控制菜单权限 通过登录后的角色对菜单就行过滤处理
// 如果需要前端 roles 控制菜单权限 请使用此文件代码替换 permission.ts 的内容

import cloneDeep from 'lodash/cloneDeep';
import { defineStore } from 'pinia';
import type { RouteRecordRaw } from 'vue-router';

import router, { fixedRouterList, homepageRouterList } from '@/router';
import { store } from '@/store';

// 严格模式 默认所有路由不可访问
const CHECK_ROLE_STRICT = false;
function filterPermissionsRouters(
  routes: Array<RouteRecordRaw>,
  roles: Array<unknown>,
): {
  accessedRouters: Array<RouteRecordRaw>;
  removedRoutes: Array<RouteRecordRaw>;
} {
  if (routes.length === 0) return { accessedRouters: [], removedRoutes: [] };
  const accessedRouters: Array<RouteRecordRaw> = [];
  const removedRoutes: Array<RouteRecordRaw> = [];
  routes.forEach((route) => {
    const roleCode = route.meta?.roleCode;
    const hasPermission = CHECK_ROLE_STRICT ? roles.includes(roleCode) : !roleCode || roles.includes(roleCode);
    if (!hasPermission) {
      const removedRoute = cloneDeep(route);
      removedRoutes.push(removedRoute);
      return;
    }
    if (!route.children || route.children.length === 0) {
      accessedRouters.push(route);
      return;
    }
    const { accessedRouters: accessedChildren, removedRoutes: removedChildren } = filterPermissionsRouters(
      route.children,
      roles,
    );
    route.children = accessedChildren;
    accessedRouters.push(route);

    if (removedChildren.length > 0) {
      const removedRoute = cloneDeep(route);
      removedRoute.children = removedChildren;
      removedRoutes.push(removedRoute);
    }
  });
  return { accessedRouters, removedRoutes };
}

const remvoeRouteFnSet = new Set<() => void>();
export const usePermissionStore = defineStore('permission', {
  state: () => ({
    routers: [],
    removeRoutes: [],
  }),
  actions: {
    async initRoutes(roles: Array<unknown>) {
      let accessedRouters: Array<RouteRecordRaw> = [];
      let removedRoutes: Array<RouteRecordRaw> = [];
      // special token
      if (roles.includes('all')) {
        accessedRouters = [...homepageRouterList, ...fixedRouterList];
      } else {
        const res = filterPermissionsRouters([...homepageRouterList, ...fixedRouterList], roles);
        accessedRouters = res.accessedRouters;
        removedRoutes = res.removedRoutes;
      }
      for (const route of accessedRouters) {
        remvoeRouteFnSet.add(router.addRoute(route));
      }
      this.routers = cloneDeep(accessedRouters);
      this.removeRoutes = removedRoutes;
    },
    async restoreRoutes() {
      for (const removeRoute of remvoeRouteFnSet) {
        removeRoute();
      }
      remvoeRouteFnSet.clear();
      this.removeRoutes = [];
      this.routers = [];
    },
  },
});

export function getPermissionStore() {
  return usePermissionStore(store);
}
