// 前端 roles 控制菜单权限 通过登录后的角色对菜单就行过滤处理
// 如果需要前端 roles 控制菜单权限 请使用此文件代码替换 permission.ts 的内容

import cloneDeep from 'lodash/cloneDeep';
import { defineStore } from 'pinia';
import type { RouteRecordRaw } from 'vue-router';

import router, { fixedRouterList, homepageRouterList } from '@/router';
import { store } from '@/store';

// 严格模式 true: 路由无roleCode不可访问 false: 路由无roleCode可访问
const CHECK_ROLE_STRICT = false;
function filterPermissionsRouters(routes: Array<RouteRecordRaw>, roles: Array<unknown>): Array<RouteRecordRaw> {
  if (routes.length === 0) return [];
  const accessedRouters: Array<RouteRecordRaw> = [];
  routes.forEach((route) => {
    const roleCode = route.meta?.roleCode;
    const hasPermission = CHECK_ROLE_STRICT ? roles.includes(roleCode) : !roleCode || roles.includes(roleCode);
    if (!hasPermission) {
      return;
    }
    if (!route.children || route.children.length === 0) {
      accessedRouters.push(route);
      return;
    }
    const accessedChildren = filterPermissionsRouters(route.children, roles);
    route.children = accessedChildren;
    accessedRouters.push(route);
  });
  return accessedRouters;
}

const removeRouteFnSet = new Set<() => void>();
export const usePermissionStore = defineStore('permission', {
  state: () => ({
    routers: [],
  }),
  actions: {
    async initRoutes(roles: Array<unknown>) {
      let accessedRouters: Array<RouteRecordRaw> = [];
      const allRoutes = cloneDeep([...homepageRouterList, ...fixedRouterList]);
      // special token
      if (roles.includes('all')) {
        accessedRouters = allRoutes;
      } else {
        accessedRouters = filterPermissionsRouters(allRoutes, roles);
      }
      for (const route of accessedRouters) {
        removeRouteFnSet.add(router.addRoute(route));
      }
      this.routers = accessedRouters;
    },
    async restoreRoutes() {
      for (const removeRoute of removeRouteFnSet) {
        removeRoute();
      }
      removeRouteFnSet.clear();
      this.routers = [];
    },
  },
});

export function getPermissionStore() {
  return usePermissionStore(store);
}
