export default [
  {
    path: '/dashboard',
    icon: 'dashboard',
    title: '仪表盘',
    component: '../layouts/index.tsx',
    redirect: '/dashboard/base',
    children: [
      {
        title: '概览仪表盘',
        path: 'base',
        component: '../pages/dashboard/base/index.vue',
      },
      {
        title: '统计报表',
        path: 'detail',
        component: '../pages/dashboard/detail/index.vue',
      },
    ],
  },
  {
    path: '/list',
    icon: 'view-module',
    title: '列表页',
    component: '../layouts/index.tsx',
    redirect: '/list/base',
    children: [
      {
        title: '基础列表页',
        path: 'base',
        component: '../pages/list/base/index.vue',
      },
      {
        title: '卡片列表页',
        path: 'card',
        component: '../pages/list/card/index.vue',
      },
      {
        title: '筛选列表页',
        path: 'filter',
        component: '../pages/list/filter/index.vue',
      },
      {
        title: '树状筛选列表页',
        path: 'tree',
        component: '../pages/list/tree/index.vue',
      },
    ],
  },
  {
    path: '/form',
    icon: 'queue',
    title: '表单页',
    component: '../layouts/index.tsx',
    redirect: '/form/base',
    children: [
      {
        title: '基础表单页',
        path: 'base',
        component: '../pages/form/base/index.vue',
      },
      {
        title: '分步表单页',
        path: 'step',
        component: '../pages/form/step/index.vue',
      },
    ],
  },
  {
    path: '/detail',
    icon: 'layers',
    title: '详情页',
    component: '../layouts/index.tsx',
    redirect: '/detail/base',
    children: [
      {
        title: '基础详情页',
        path: 'base',
        component: '../pages/detail/base/index.vue',
        // 默认不填，则需要每个页面都会经过登录的校验，若不需要进行登录校验则将needLogin：设为false
        meta: { needLogin: false, title: '基础详情页' },
      },
      {
        title: '多卡片详情页',
        path: 'advanced',
        component: '../pages/detail/advanced/index.vue',
      },
      {
        title: '数据详情页',
        path: 'deploy',
        component: '../pages/detail/deploy/index.vue',
      },
      {
        title: '二级详情页',
        path: 'secondary',
        component: '../pages/detail/secondary/index.vue',
      },
    ],
  },
  {
    path: '/result',
    icon: 'check-circle',
    title: '结果页',
    component: '../layouts/index.tsx',
    redirect: '/result/success',
    children: [
      {
        title: '成功页',
        path: 'success',
        component: '../pages/result/success/index.vue',
      },
      {
        title: '失败页',
        path: 'fail',
        component: '../pages/result/fail/index.vue',
      },
      {
        title: '网络异常',
        path: 'network-error',
        component: '../pages/result/network-error/index.vue',
      },
      {
        title: '无权限',
        path: '403',
        component: '../pages/result/403/index.vue',
      },
      {
        title: '访问页面不存在页',
        path: '404',
        component: '../pages/result/404/index.vue',
      },
      {
        title: '服务器出错页',
        path: '500',
        component: '../pages/result/500/index.vue',
      },
      {
        title: '浏览器不兼容页',
        path: 'browser-incompatible',
        component: '../pages/result/browser-incompatible/index.vue',
      },
    ],
  },
  {
    path: '/user',
    icon: 'user-circle',
    title: '个人页',
    component: '../layouts/index.tsx',
    redirect: '/user/index',
    children: [
      {
        title: '个人中心',
        path: 'index',
        component: '../pages/user/index.vue',
      },
    ],
  },
  // 自定义登录页面
  {
    path: '/login',
    title: '登录页',
    component: '../layouts/blank.vue',
    icon: 'chevron-right-rectangle',
    redirect: '/login/index',
    children: [
      {
        title: '登录中心',
        path: 'index',
        meta: { needLogin: false },
        component: '../pages/login/index.vue',
      },
    ],
  },
];
