import { DashboardIcon } from 'tdesign-icons-vue-next';
import { shallowRef } from 'vue';

import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/base',
    name: 'dashboard',
    meta: {
      title: {
        zh_CN: '仪表盘',
        en_US: 'Dashboard',
      },
      icon: shallowRef(DashboardIcon),
      orderNo: 0,
    },
    children: [
      {
        path: 'base-1',
        name: 'DashboardBase-1',
        // component: () => import('@/pages/dashboard/base/index.vue'),
        meta: {
          title: {
            zh_CN: '概览仪表盘',
            en_US: 'Overview',
          },
        },
        children: [
          {
            path: 'base',
            name: 'DashboardBase',
            component: () => import('@/pages/dashboard/base/index.vue'),
            meta: {
              title: {
                zh_CN: '概览仪表盘-1',
                en_US: 'Overview-1',
              },
            },
          },
          {
            path: 'detail-1',
            name: 'DashboardDetail-1',
            component: () => import('@/pages/dashboard/detail/index.vue'),
            meta: {
              title: {
                zh_CN: '统计报表-1',
                en_US: 'Dashboard Detail-1',
              },
            },
          },
        ],
      },
      {
        path: 'detail',
        name: 'DashboardDetail',
        component: () => import('@/pages/dashboard/detail/index.vue'),
        meta: {
          title: {
            zh_CN: '统计报表',
            en_US: 'Dashboard Detail',
          },
        },
      },
    ],
  },
];
