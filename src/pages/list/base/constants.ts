import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';

import { t } from '@/locales';

export const COLUMNS: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 64, fixed: 'left' },
  {
    title: t('pages.listBase.contractName'),
    align: 'left',
    width: 320,
    colKey: 'name',
    fixed: 'left',
  },
  { title: t('pages.listBase.contractStatus'), colKey: 'status', width: 160 },
  {
    title: t('pages.listBase.contractNum'),
    width: 160,
    ellipsis: true,
    colKey: 'no',
  },
  {
    title: t('pages.listBase.contractType'),
    width: 160,
    ellipsis: true,
    colKey: 'contractType',
  },
  {
    title: t('pages.listBase.contractPayType'),
    width: 160,
    ellipsis: true,
    colKey: 'paymentType',
  },
  {
    title: t('pages.listBase.contractAmount'),
    width: 160,
    ellipsis: true,
    colKey: 'amount',
  },
  {
    align: 'left',
    fixed: 'right',
    width: 160,
    colKey: 'op',
    title: t('pages.listBase.operation'),
  },
];
