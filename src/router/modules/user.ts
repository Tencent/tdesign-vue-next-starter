import { LogoutIcon } from 'tdesign-icons-vue-next';
import { shallowRef } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/user',
    name: 'user',
    component: Layout,
    redirect: '/user/index',
    meta: { title: { zh_CN: '个人中心', en_US: 'User Center' }, icon: 'user-circle', roleCode: 'dev' },
    children: [
      {
        path: 'index',
        name: 'UserIndex',
        component: () => import('@/pages/user/index.vue'),
        meta: { title: { zh_CN: '个人中心', en_US: 'User Center' }, roleCode: 'dev' },
      },
    ],
  },
  {
    path: '/loginRedirect',
    name: 'loginRedirect',
    redirect: '/login',
    meta: { title: { zh_CN: '登录页', en_US: 'Login' }, icon: shallowRef(LogoutIcon), roleCode: 'dev' },
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'index',
        redirect: '/login',
        meta: { title: { zh_CN: '登录页', en_US: 'Login' }, roleCode: 'dev' },
      },
    ],
  },
] satisfies RouteRecordRaw[];
