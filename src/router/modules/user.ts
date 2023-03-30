import { LogoutIcon } from 'tdesign-icons-vue-next';
import { shallowRef } from 'vue';
import Layout from '@/layouts/index.vue';
import { t } from '@/locales';

export default [
  {
    path: '/user',
    name: 'user',
    component: Layout,
    redirect: '/user/index',
    meta: { title: t('user.home'), icon: 'user-circle' },
    children: [
      {
        path: 'index',
        name: 'UserIndex',
        component: () => import('@/pages/user/index.vue'),
        meta: { title: '个人中心' },
      },
    ],
  },
  {
    path: '/loginRedirect',
    name: 'loginRedirect',
    redirect: '/login',
    meta: { title: t('user.login.home'), icon: shallowRef(LogoutIcon) },
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'index',
        redirect: '/login',
        component: () => import('@/layouts/blank.vue'),
        meta: { title: '登录中心' },
      },
    ],
  },
];
