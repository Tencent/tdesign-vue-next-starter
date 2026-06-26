import { t } from '@/locales';

export const getTreeData = () => [
  {
    label: t('pages.listTree.treeData.shenzhen'),
    value: 0,
    children: [
      {
        label: t('pages.listTree.treeData.generalOffice'),
        value: '0-0',
      },
      {
        label: t('pages.listTree.treeData.marketing'),
        value: '0-1',
        children: [
          {
            label: t('pages.listTree.treeData.purchase1'),
            value: '0-1-0',
          },
          {
            label: t('pages.listTree.treeData.purchase2'),
            value: '0-1-1',
          },
        ],
      },
      {
        label: t('pages.listTree.treeData.technology'),
        value: '0-2',
      },
    ],
  },
  {
    label: t('pages.listTree.treeData.beijing'),
    value: 1,
    children: [
      {
        label: t('pages.listTree.treeData.generalOffice'),
        value: '1-0',
      },
      {
        label: t('pages.listTree.treeData.marketing'),
        value: '1-1',
        children: [
          {
            label: t('pages.listTree.treeData.purchase1'),
            value: '1-1-0',
          },
          {
            label: t('pages.listTree.treeData.purchase2'),
            value: '1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: t('pages.listTree.treeData.shanghai'),
    value: 2,
    children: [
      {
        label: t('pages.listTree.treeData.marketing'),
        value: '2-0',
      },
      {
        label: t('pages.listTree.treeData.finance'),
        value: '2-1',
        children: [
          {
            label: t('pages.listTree.treeData.finance1'),
            value: '2-1-0',
          },
          {
            label: t('pages.listTree.treeData.finance2'),
            value: '2-1-1',
          },
        ],
      },
    ],
  },
  {
    label: t('pages.listTree.treeData.hunan'),
    value: 3,
  },
  {
    label: t('pages.listTree.treeData.hubei'),
    value: 4,
  },
];
