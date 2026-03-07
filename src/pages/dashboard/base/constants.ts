interface TendItem {
  growUp?: number;
  productName: string;
  count: number;
  date: string;
}

export const SALE_TEND_LIST: Array<TendItem> = [
  {
    growUp: 1,
    productName: 'pages.dashboardBase.saleTend.item1',
    count: 7059,
    date: '2021-09-01',
  },
  {
    growUp: -1,
    productName: 'pages.dashboardBase.saleTend.item2',
    count: 6437,
    date: '2021-09-01',
  },
  {
    growUp: 4,
    productName: 'pages.dashboardBase.saleTend.item3',
    count: 4221,
    date: '2021-09-01',
  },
  {
    growUp: 3,
    productName: 'pages.dashboardBase.saleTend.item4',
    count: 3317,
    date: '2021-09-01',
  },
  {
    growUp: -3,
    productName: 'pages.dashboardBase.saleTend.item5',
    count: 3015,
    date: '2021-09-01',
  },
  {
    growUp: -3,
    productName: 'pages.dashboardBase.saleTend.item6',
    count: 2015,
    date: '2021-09-12',
  },
];

export const BUY_TEND_LIST: Array<TendItem> = [
  {
    growUp: 1,
    productName: 'pages.dashboardBase.buyTend.item1',
    count: 3015,
    date: '2021-09-01',
  },
  {
    growUp: -1,
    productName: 'pages.dashboardBase.buyTend.item2',
    count: 2015,
    date: '2021-09-01',
  },
  {
    growUp: 6,
    productName: 'pages.dashboardBase.buyTend.item3',
    count: 1815,
    date: '2021-09-11',
  },
  {
    growUp: -3,
    productName: 'pages.dashboardBase.buyTend.item4',
    count: 1015,
    date: '2021-09-21',
  },
  {
    growUp: -4,
    productName: 'pages.dashboardBase.buyTend.item5',
    count: 445,
    date: '2021-09-19',
  },
  {
    growUp: -3,
    productName: 'pages.dashboardBase.buyTend.item6',
    count: 2015,
    date: '2021-09-12',
  },
];
