import layouts  from "@/layouts"

export default [{
  path: '/list',
  icon: 'view-module',
  title: '列表页',
  component: layouts,
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
},]