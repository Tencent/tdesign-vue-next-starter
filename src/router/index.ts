import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import routeConfig from '@/config/routes';

const layoutModules = import.meta.glob('../layouts/*');
const pagesModules = import.meta.glob('../pages/**/*.vue');
const fristPagesModules = import.meta.glob('../pages/*.vue');

const modules = Object.assign({}, layoutModules, fristPagesModules, pagesModules);

const getMenuRoutes = (list) => {
  if (!list) {
    return [];
  }
  return list.map((item) => {
    const { path = '', component, meta = { title: item.title }, redirect = '' } = item;
    return {
      path,
      component: modules[component],
      children: getMenuRoutes(item.children),
      meta,
      redirect,
    };
  });
};

const routes: Array<RouteRecordRaw> = [
  ...getMenuRoutes(routeConfig),
  {
    path: '',
    redirect: '/dashboard/base',
    component: () => import('@/pages/dashboard/base/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(''),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    }
  },
})
export default router

