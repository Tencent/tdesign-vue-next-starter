import 'nprogress/nprogress.css'; // progress bar style

import NProgress from 'nprogress'; // progress bar
import { MessagePlugin } from 'tdesign-vue-next';
import { RouteRecordRaw } from 'vue-router';

import router from '@/router';
import { getPermissionStore, getUserStore } from '@/store';
import { PAGE_NOT_FOUND_ROUTE } from '@/utils/route/constant';

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  const permissionStore = getPermissionStore();
  const { whiteListRouters } = permissionStore;

  const userStore = getUserStore();
  const { token } = userStore;
  if (token) {
    if (to.path === '/login') {
      next();
      return;
    }
    try {
      await userStore.getUserInfo();
    } catch (error) {
      MessagePlugin.error(error);
      next({
        path: '/login',
        query: { redirect: encodeURIComponent(to.fullPath) },
      });
      NProgress.done();
    }

    const { asyncRoutes } = permissionStore;

    if (asyncRoutes && asyncRoutes.length === 0) {
      let routeList;
      try {
        routeList = await permissionStore.buildAsyncRoutes();
      } catch (error) {
        MessagePlugin.error(error.message);
        NProgress.done();
        throw error;
      }
      routeList.forEach((item: RouteRecordRaw) => {
        router.addRoute(item);
      });

      if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
        // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
        next({ path: to.fullPath, replace: true, query: to.query });
      } else {
        const redirect = decodeURIComponent((from.query.redirect || to.path) as string);
        next(to.path === redirect ? { ...to, replace: true } : { path: redirect });
        return;
      }
    }

    if (router.hasRoute(to.name)) {
      next();
    } else {
      next(`/`);
    }
  } else {
    /* white list router */
    if (whiteListRouters.indexOf(to.path) !== -1) {
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
    const userStore = getUserStore();
    const permissionStore = getPermissionStore();

    userStore.logout();
    permissionStore.restoreRoutes();
  }
  NProgress.done();
});
