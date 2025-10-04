// 前端 roles 控制菜单权限 通过登录后的角色对菜单就行过滤处理
// 如果需要前端 roles 控制菜单权限 请使用此文件代码替换 permission.ts 的内容

import cloneDeep from 'lodash/cloneDeep';
import { defineStore } from 'pinia';
import type { RouteRecordName, RouteRecordRaw } from 'vue-router';

import router, { allRoutes } from '@/router';
import { store } from '@/store';

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
    if (roles.includes(roleCode)) {
      if (route.children) {
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
      } else {
        accessedRouters.push(route);
      }
    } else {
      const removedRoute = cloneDeep(route);
      removedRoutes.push(removedRoute);
    }
  });
  return { accessedRouters, removedRoutes };
}

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    whiteListRouters: ['/login'],
    routers: [],
    removeRoutes: [],
  }),
  actions: {
    async initRoutes(roles: Array<unknown>) {
      let accessedRouters: Array<RouteRecordRaw> = [];
      let removedRoutes: Array<RouteRecordRaw> = [];
      // special token
      if (roles.includes('all')) {
        accessedRouters = allRoutes;
      } else {
        const res = filterPermissionsRouters(allRoutes, roles);
        accessedRouters = res.accessedRouters;
        removedRoutes = res.removedRoutes;
      }
      this.routers = cloneDeep(accessedRouters);
      this.removeRoutes = removedRoutes;

      function checkNameInRoutes(name: RouteRecordName, routes: Array<RouteRecordRaw>) {
        if (routes.length === 0) return false;
        for (const route of routes) {
          if (route.name === name) {
            return true;
          }
          if (route.children && route.children.length > 0) {
            if (checkNameInRoutes(name, route.children)) {
              return true;
            }
          }
        }
        return false;
      }
      function removeRoutes(routes: Array<RouteRecordRaw>) {
        for (const route of routes) {
          if (route.children && route.children.length > 0) {
            removeRoutes(route.children);
          }
          const canRemoveRoute = !checkNameInRoutes(route.name, accessedRouters);
          if (canRemoveRoute && router.hasRoute(route.name)) {
            router.removeRoute(route.name);
          }
        }
      }
      removeRoutes(removedRoutes);
    },
    async restoreRoutes() {
      function addRemovedRoutes(routes: Array<RouteRecordRaw>, parentName?: RouteRecordName) {
        for (const route of routes) {
          console.log(parentName, route);
          if (!router.hasRoute(route.name)) {
            if (parentName) {
              router.addRoute(parentName, route);
            } else {
              router.addRoute(route);
            }
          }
          if (route.children && route.children.length > 0) {
            addRemovedRoutes(route.children, route.name);
          }
        }
      }
      addRemovedRoutes(this.removeRoutes);
      this.removeRoutes = [];
      this.routers = [];
    },
  },
});

export function getPermissionStore() {
  return usePermissionStore(store);
}
