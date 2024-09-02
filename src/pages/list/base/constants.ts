import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';

export const COLUMNS: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 64, fixed: 'left' },
  {
    title: '合同名称',
    align: 'left',
    width: 320,
    colKey: 'name',
    fixed: 'left',
  },
  { title: '合同状态', colKey: 'status', width: 160 },
  {
    title: '合同编号',
    width: 160,
    ellipsis: true,
    colKey: 'no',
  },
  {
    title: '合同类型',
    width: 160,
    ellipsis: true,
    colKey: 'contractType',
  },
  {
    title: '合同收付类型',
    width: 160,
    ellipsis: true,
    colKey: 'paymentType',
  },
  {
    title: '合同金额 (元)',
    width: 160,
    ellipsis: true,
    colKey: 'amount',
  },
  {
    align: 'left',
    fixed: 'right',
    width: 160,
    colKey: 'op',
    title: '操作',
  },
];
