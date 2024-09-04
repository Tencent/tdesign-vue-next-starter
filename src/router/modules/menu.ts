import Blank from '@/layouts/blank.vue';
import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/menu',
    name: 'menu',
    component: Layout,
    redirect: '/menu/index',
    meta: { title: '嵌套菜单', icon: 'menu-fold' },
    children: [
      {
        path: 'index',
        name: 'MenuIndex',
        component: () => import('@/pages/result/success/index.vue'),
        meta: { title: '一级菜单' },
      },
      {
        path: 'second',
        name: 'MenuSecond',
        redirect: '/menu/second/index',
        component: Blank,
        meta: { title: '二级菜单', icon: 'menu-fold' },
        children: [
          {
            path: 'index',
            name: 'MenuSecondIndex',
            component: () => import('@/pages/result/success/index.vue'),
            meta: { title: '二级页面' },
          },
          {
            path: 'third',
            name: 'MenuThird',
            component: Blank,
            meta: { title: '三级菜单', icon: 'menu-fold' },
            children: [
              {
                path: 'index',
                name: 'MenuThirdIndex',
                component: () => import('@/pages/result/success/index.vue'),
                meta: { title: '三级页面' },
              },
            ],
          },
        ],
      },
    ],
  },
];
