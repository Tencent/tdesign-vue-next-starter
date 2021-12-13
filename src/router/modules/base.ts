import Layout from '@/layouts';

export default [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/base',
    name: 'dashboard',
    meta: { title: '仪表盘', icon: 'dashboard' },
    children: [
      {
        path: 'base',
        name: 'dashboardBase',
        component: () => import('@/pages/dashboard/base/index.vue'),
        meta: { title: '概览仪表盘' },
      },
      {
        path: 'detail',
        name: 'dashboardDetail',
        component: () => import('@/pages/dashboard/detail/index.vue'),
        meta: { title: '统计报表' },
      },
    ],
  },
];
