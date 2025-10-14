import 'nprogress/nprogress.css'; // progress bar style

import NProgress from 'nprogress'; // progress bar
import { MessagePlugin } from 'tdesign-vue-next';

// import type { RouteRecordRaw } from 'vue-router';
import router, { whiteListRoutePath } from '@/router';
import { getPermissionStore, useUserStore } from '@/store';
import { PAGE_NOT_FOUND_ROUTE } from '@/utils/route/constant';

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  const userStore = useUserStore();

  if (userStore.token) {
    if (to.path === '/login') {
      next();
      return;
    }
    try {
      await userStore.getUserInfo();
      const permissionStore = getPermissionStore();

      // 后端权限控制
      const { asyncRoutes } = permissionStore;
      if (asyncRoutes && asyncRoutes.length === 0) {
        await permissionStore.buildAsyncRoutes();

        if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
          // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
          next({ path: to.fullPath, replace: true, query: to.query });
        } else {
          const redirect = decodeURIComponent((from.query.redirect || to.path) as string);
          next(to.path === redirect ? { ...to, replace: true } : { path: redirect, query: to.query });
          return;
        }
      }

      // 前端权限控制
      // const { routers } = permissionStore;
      // if (routers.length === 0) {
      //   await permissionStore.initRoutes(userStore.roles);
      //   next({ ...to, replace: true });
      //   return;
      // }

      next();
    } catch (error) {
      MessagePlugin.error(error.message);
      next({
        path: '/login',
        query: { redirect: encodeURIComponent(to.fullPath) },
      });
      NProgress.done();
    }
  } else {
    if (whiteListRoutePath.includes(to.path)) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: encodeURIComponent(to.fullPath) },
      });
    }
    NProgress.done();
  }
});

router.afterEach((to) => {
  if (to.path === '/login') {
    const userStore = useUserStore();
    userStore.logout();

    const permissionStore = getPermissionStore();
    permissionStore.restoreRoutes();
  }
  NProgress.done();
});
