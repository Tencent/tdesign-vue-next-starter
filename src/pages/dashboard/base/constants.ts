import { TdBaseTableProps } from 'tdesign-vue-next';

import { t } from '@/locales';

interface DashboardPanel {
  title: string;
  number: string | number;
  leftType: string;
  upTrend?: string;
  downTrend?: string;
}

interface TendItem {
  growUp?: number;
  productName: string;
  count: number;
  date: string;
}

export const PANE_LIST: Array<DashboardPanel> = [
  {
    title: t('dashboard.base.topPanel.card1'),
    number: '¥ 28,425.00',
    upTrend: '20.5%',
    leftType: 'echarts-line',
  },
  {
    title: t('dashboard.base.topPanel.card2'),
    number: '¥ 768.00',
    downTrend: '20.5%',
    leftType: 'echarts-bar',
  },
  {
    title: t('dashboard.base.topPanel.card3'),
    number: '1126',
    upTrend: '20.5%',
    leftType: 'icon-usergroup',
  },
  {
    title: t('dashboard.base.topPanel.card4'),
    number: 527,
    downTrend: '20.5%',
    leftType: 'icon-file-paste',
  },
];

export const SALE_TEND_LIST: Array<TendItem> = [
  {
    growUp: 1,
    productName: '国家电网有限公司',
    count: 7059,
    date: '2021-09-01',
  },
  {
    growUp: -1,
    productName: '深圳燃气集团股份有限公司',
    count: 6437,
    date: '2021-09-01',
  },
  {
    growUp: 4,
    productName: '国家烟草专卖局',
    count: 4221,
    date: '2021-09-01',
  },
  {
    growUp: 3,
    productName: '中国电信集团有限公司',
    count: 3317,
    date: '2021-09-01',
  },
  {
    growUp: -3,
    productName: '中国移动通信集团有限公司',
    count: 3015,
    date: '2021-09-01',
  },
  {
    growUp: -3,
    productName: '新余市办公用户采购项目',
    count: 2015,
    date: '2021-09-12',
  },
];

export const BUY_TEND_LIST: Array<TendItem> = [
  {
    growUp: 1,
    productName: '腾讯科技（深圳）有限公司',
    count: 3015,
    date: '2021-09-01',
  },
  {
    growUp: -1,
    productName: '大润发有限公司',
    count: 2015,
    date: '2021-09-01',
  },
  {
    growUp: 6,
    productName: '四川海底捞股份有限公司',
    count: 1815,
    date: '2021-09-11',
  },
  {
    growUp: -3,
    productName: '索尼（中国）有限公司',
    count: 1015,
    date: '2021-09-21',
  },
  {
    growUp: -4,
    productName: '松下电器（中国）有限公司',
    count: 445,
    date: '2021-09-19',
  },
  {
    growUp: -3,
    productName: '新余市办公用户采购项目',
    count: 2015,
    date: '2021-09-12',
  },
];

export const SALE_COLUMNS: TdBaseTableProps['columns'] = [
  {
    align: 'center',
    colKey: 'index',
    title: t('dashboard.base.saleColumns.index'),
    width: 70,
    fixed: 'left',
  },
  {
    align: 'left',
    ellipsis: true,
    colKey: 'productName',
    title: t('dashboard.base.saleColumns.productName'),
    width: 150,
  },
  {
    align: 'center',
    colKey: 'growUp',
    width: 70,
    title: t('dashboard.base.saleColumns.growUp'),
  },
  {
    align: 'center',
    colKey: 'count',
    title: t('dashboard.base.saleColumns.count'),
    width: 70,
  },
  {
    align: 'center',
    colKey: 'operation',
    title: t('dashboard.base.saleColumns.operation'),
    width: 70,
    fixed: 'right',
  },
];

export const BUY_COLUMNS: TdBaseTableProps['columns'] = [
  {
    align: 'center',
    colKey: 'index',
    title: t('dashboard.base.buyColumns.index'),
    width: 70,
    fixed: 'left',
  },
  {
    align: 'left',
    ellipsis: true,
    colKey: 'productName',
    width: 150,
    title: t('dashboard.base.buyColumns.productName'),
  },
  {
    align: 'center',
    colKey: 'growUp',
    width: 70,
    title: t('dashboard.base.buyColumns.growUp'),
  },
  {
    align: 'center',
    colKey: 'count',
    title: t('dashboard.base.buyColumns.count'),
    width: 70,
  },
  {
    align: 'center',
    colKey: 'operation',
    title: t('dashboard.base.buyColumns.operation'),
    width: 70,
    fixed: 'right',
  },
];
