import { t } from '@/locales';

export const getBaseInfoData = () => [
  {
    name: t('constants.contract.name'),
    value: t('pages.detailBase.sampleData.contractName'),
    type: null,
  },
  {
    name: t('constants.contract.status'),
    value: t('pages.detailBase.sampleData.status'),
    type: {
      key: 'contractStatus',
      value: 'inProgress',
    },
  },
  {
    name: t('constants.contract.num'),
    value: 'BH00010',
    type: null,
  },
  {
    name: t('constants.contract.type'),
    value: t('constants.contract.typeOptions.main'),
    type: null,
  },
  {
    name: t('constants.contract.payType'),
    value: t('constants.contract.pay'),
    type: null,
  },
  {
    name: t('constants.contract.amount'),
    value: '¥ 5,000,000',
    type: null,
  },
  {
    name: t('constants.contract.company'),
    value: t('pages.detailBase.sampleData.company'),
    type: null,
  },
  {
    name: t('constants.contract.employee'),
    value: t('pages.detailBase.sampleData.employee'),
    type: null,
  },
  {
    name: t('constants.contract.signDate'),
    value: '2020-12-20',
    type: null,
  },
  {
    name: t('constants.contract.effectiveDate'),
    value: '2021-01-20',
    type: null,
  },
  {
    name: t('constants.contract.endDate'),
    value: '2022-12-20',
    type: null,
  },
  {
    name: t('constants.contract.attachment'),
    value: t('pages.detailBase.sampleData.fileName'),
    type: {
      key: 'contractAnnex',
      value: 'pdf',
    },
  },
  {
    name: t('constants.contract.remark'),
    value: '--',
    type: null,
  },
  {
    name: t('constants.contract.createDate'),
    value: '2020-12-22 10:00:00',
    type: null,
  },
];

export const getProductList = () => [
  {
    name: t('pages.detailCard.products.product1.name'),
    subtitle: t('pages.detailCard.products.product1.company'),
    size: t('pages.detailCard.products.product1.size'),
    cpu: t('pages.detailCard.products.product1.cpu'),
    memory: t('pages.detailCard.products.product1.memory'),
    info: t('pages.detailCard.products.product1.info'),
    use: 1420,
    stock: 1500,
  },
  {
    name: t('pages.detailCard.products.product2.name'),
    subtitle: t('pages.detailCard.products.product2.company'),
    size: t('pages.detailCard.products.product2.size'),
    cpu: t('pages.detailCard.products.product2.cpu'),
    memory: t('pages.detailCard.products.product2.memory'),
    info: t('pages.detailCard.products.product2.info'),
    use: 120,
    stock: 2000,
  },
];
