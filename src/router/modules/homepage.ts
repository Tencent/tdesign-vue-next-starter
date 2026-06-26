import { DashboardIcon } from 'tdesign-icons-vue-next';
import { shallowRef } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

import { LAYOUT } from '@/utils/route/constant';

export default [
  {
    path: '/dashboard',
    component: LAYOUT,
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
        path: 'base',
        name: 'DashboardBase',
        component: () => import('@/pages/dashboard/base/index.vue'),
        meta: {
          title: {
            zh_CN: '概览仪表盘',
            en_US: 'Overview',
          },
        },
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        meta: {
          title: {
            zh_CN: '报表',
            en_US: 'Dashboard',
          },
        },
        children: [
          {
            path: 'detail',
            name: 'Detail',
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
    ],
  },
] satisfies RouteRecordRaw[];
