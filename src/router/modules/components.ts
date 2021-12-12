import Layout from '@/layouts';

export default [
  {
    path: '/list',
    name: 'list',
    component: Layout,
    redirect: '/list/base',
    meta: { title: '列表页', icon: 'view-module' },
    children: [
      {
        path: 'base',
        name: 'listBase',
        component: () => import('@/pages/list/base/index.vue'),
        meta: { title: '基础列表页' },
      },
      {
        path: 'card',
        name: 'listCard',
        component: () => import('@/pages/list/card/index.vue'),
        meta: { title: '卡片列表页' },
      },
      {
        path: 'filter',
        name: 'listFilter',
        component: () => import('@/pages/list/filter/index.vue'),
        meta: { title: '筛选列表页' },
      },
      {
        path: 'tree',
        name: 'listTree',
        component: () => import('@/pages/list/tree/index.vue'),
        meta: { title: '树状筛选列表页' },
      },
    ],
  },
  {
    path: '/form',
    name: 'form',
    component: Layout,
    redirect: '/form/base',
    meta: { title: '表单页', icon: 'queue' },
    children: [
      {
        path: 'base',
        name: 'formBase',
        component: () => import('@/pages/form/base/index.vue'),
        meta: { title: '基础表单页' },
      },
      {
        path: 'step',
        name: 'formStep',
        component: () => import('@/pages/form/step/index.vue'),
        meta: { title: '分步表单页' },
      },
    ],
  },
  {
    path: '/detail',
    name: 'detail',
    component: Layout,
    redirect: '/detail/base',
    meta: { title: '详情页', icon: 'layers' },
    children: [
      {
        path: 'base',
        name: 'detailBase',
        component: () => import('@/pages/detail/base/index.vue'),
        meta: { title: '基础详情页' },
      },
      {
        path: 'advanced',
        name: 'detailAdvanced',
        component: () => import('@/pages/detail/advanced/index.vue'),
        meta: { title: '多卡片详情页' },
      },
      {
        path: 'deploy',
        name: 'detailDeploy',
        component: () => import('@/pages/detail/deploy/index.vue'),
        meta: { title: '数据详情页' },
      },
      {
        path: 'secondary',
        name: 'detailDeploy',
        component: () => import('@/pages/detail/secondary/index.vue'),
        meta: { title: '二级详情页' },
      },
    ],
  },
  {
    path: '/result',
    name: 'result',
    component: Layout,
    redirect: '/result/success',
    meta: { title: '结果页', icon: 'check-circle' },
    children: [
      {
        path: 'success',
        name: 'resultSuccess',
        component: () => import('@/pages/result/success/index.vue'),
        meta: { title: '成功页' },
      },
      {
        path: 'fail',
        name: 'resultFail',
        component: () => import('@/pages/result/fail/index.vue'),
        meta: { title: '失败页' },
      },
    ],
  },
  {
    path: '/warning',
    name: 'warning',
    component: Layout,
    redirect: '/warning/success',
    meta: { title: '异常页', icon: 'error-circle' },
    children: [
      {
        path: 'network-error',
        name: 'warningNetworkError',
        component: () => import('@/pages/result/network-error/index.vue'),
        meta: { title: '网络异常' },
      },
      {
        path: '403',
        name: 'warning403',
        component: () => import('@/pages/result/403/index.vue'),
        meta: { title: '无权限' },
      },
      {
        path: '404',
        name: 'warning404',
        component: () => import('@/pages/result/404/index.vue'),
        meta: { title: '访问页面不存在页' },
      },
      {
        path: '500',
        name: 'warning500',
        component: () => import('@/pages/result/500/index.vue'),
        meta: { title: '服务器出错页' },
      },
      {
        path: 'browser-incompatible',
        name: 'warningBrowserIncompatible',
        component: () => import('@/pages/result/browser-incompatible/index.vue'),
        meta: { title: '浏览器不兼容页' },
      },
    ],
  },
];
