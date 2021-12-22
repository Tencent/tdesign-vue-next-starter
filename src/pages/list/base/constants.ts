export const COLUMNS = [
  { colKey: 'row-select', type: 'multiple', width: 64, fixed: 'left' },
  {
    title: '合同名称',
    align: 'left',
    width: 300,
    colKey: 'name',
    fixed: 'left',
  },
  { title: '合同状态', colKey: 'status', width: 200, cell: { col: 'status' } },
  {
    title: '合同编号',
    width: 200,
    ellipsis: true,
    colKey: 'no',
  },
  {
    title: '合同类型',
    width: 200,
    ellipsis: true,
    colKey: 'contractType',
  },
  {
    title: '合同收付类型',
    width: 200,
    ellipsis: true,
    colKey: 'paymentType',
  },
  {
    title: '合同金额 (元)',
    width: 200,
    ellipsis: true,
    colKey: 'amount',
  },
  {
    align: 'left',
    fixed: 'right',
    width: 200,
    colKey: 'op',
    title: '操作',
  },
];
