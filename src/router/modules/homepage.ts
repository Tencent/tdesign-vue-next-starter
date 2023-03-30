import { DashboardIcon } from 'tdesign-icons-vue-next';
import { shallowRef } from 'vue';
import Layout from '@/layouts/index.vue';
import { t } from '@/locales';

export default [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/base',
    name: 'dashboard',
    meta: {
      title: t('home.dashboard'),
      icon: shallowRef(DashboardIcon),
      orderNo: 0,
    },
    children: [
      {
        path: 'base',
        name: 'DashboardBase',
        component: () => import('@/pages/dashboard/base/index.vue'),
        meta: {
          title: t('home.dashboardBase'),
        },
      },
      {
        path: 'detail',
        name: 'DashboardDetail',
        component: () => import('@/pages/dashboard/detail/index.vue'),
        meta: {
          title: t('home.dashboardDetail'),
        },
      },
    ],
  },
];
