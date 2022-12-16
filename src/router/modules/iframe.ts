import Layout from '@/layouts/index.vue';

const IFrame = () => import('@/layouts/components/FrameBlank.vue');

export default [
  {
    path: '/frame',
    name: 'Frame',
    component: Layout,
    redirect: '/frame/doc',
    meta: {
      icon: 'internet',
      title: '外部页面',
    },

    children: [
      {
        path: 'doc',
        name: 'Doc',
        component: IFrame,
        meta: {
          frameSrc: 'https://tdesign.tencent.com/starter/docs/vue-next/get-started',
          title: '使用文档（内嵌）',
        },
      },
      {
        path: 'TDesign',
        name: 'TDesign',
        component: IFrame,
        meta: {
          frameSrc: 'https://tdesign.tencent.com/vue-next/getting-started',
          title: 'TDesign 文档（内嵌）',
        },
      },
      {
        path: 'TDesign2',
        name: 'TDesign2',
        component: IFrame,
        meta: {
          frameSrc: 'https://tdesign.tencent.com/vue-next/getting-started',
          frameBlank: true,
          title: 'TDesign 文档（外链）',
        },
      },
    ],
  },
];
