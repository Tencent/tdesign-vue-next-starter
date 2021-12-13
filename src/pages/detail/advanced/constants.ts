export const BASE_INFO_DATA = [
  {
    name: '合同名称',
    value: '总部办公用品采购项目',
    type: null,
  },
  {
    name: '合同状态',
    value: '履行中',
    type: {
      key: 'contractStatus',
      value: 'inProgress',
    },
  },
  {
    name: '合同编号',
    value: 'BH00010',
    type: null,
  },
  {
    name: '合同类型',
    value: '主合同',
    type: null,
  },
  {
    name: '合同收付类型',
    value: '付款',
    type: null,
  },
  {
    name: '合同金额',
    value: '5,000,000元',
    type: null,
  },
  {
    name: '甲方',
    value: '腾讯科技（深圳）有限公司',
    type: null,
  },
  {
    name: '乙方',
    value: '欧尚',
    type: null,
  },
  {
    name: '合同签订日期',
    value: '2020-12-20',
    type: null,
  },
  {
    name: '合同生效日期',
    value: '2021-01-20',
    type: null,
  },
  {
    name: '合同结束日期',
    value: '2022-12-20',
    type: null,
  },
  {
    name: '合同附件',
    value: '总部办公用品采购项目合同.pdf',
    type: {
      key: 'contractAnnex',
      value: 'pdf',
    },
  },
  {
    name: '备注',
    value: '--',
    type: null,
  },
  {
    name: '创建时间',
    value: '2020-12-22 10:00:00',
    type: null,
  },
];

export const TABLE_COLUMNS_DATA = [
  {
    width: 300,
    ellipsis: true,
    colKey: 'index',
    title: '申请号',
    sorter: (a, b) => a.index.substr(3) - b.index.substr(3),
  },
  {
    width: 200,
    ellipsis: true,
    colKey: 'pdName',
    title: '产品名称',
    sorter: (a, b) => a.pdName.length - b.pdName.length,
  },
  {
    width: 200,
    ellipsis: true,
    colKey: 'pdNum',
    title: '产品编号',
  },
  {
    width: 200,
    ellipsis: true,
    colKey: 'purchaseNum',
    title: '采购数量',
    sorter: (a, b) => a.purchaseNum - b.purchaseNum,
  },
  {
    width: 200,
    ellipsis: true,
    colKey: 'adminName',
    title: '申请部门',
  },
  {
    width: 200,
    ellipsis: true,
    colKey: 'updateTime',
    title: '创建时间',
    sorter: (a, b) => Date.parse(a.updateTime) - Date.parse(b.updateTime),
  },
  {
    align: 'left',
    fixed: 'right',
    width: 200,
    className: 'test2',
    colKey: 'op',
    title: '操作',
  },
];

export const PRODUCT_LIST = [
  {
    name: 'MacBook Pro 2021',
    subTitle: 'MacBook Pro 2021',
    size: '13.3 英寸',
    cpu: 'Apple M1',
    memory: 'RAM 16GB',
    info: '最高可选配 16GB 内存 · 最高可选配 2TB 存储设备 电池续航最长达 18 小时',
    use: 1420,
    stock: 1500,
  },
  {
    name: 'Surface Laptop Go',
    subTitle: '微软（Microsoft Corporation）',
    size: '12.4 英寸',
    cpu: 'Core i7',
    memory: 'RAM 16GB',
    info: '常规使用 Surface，续航时间最长可达13小时 随时伴您工作',
    use: 120,
    stock: 2000,
  },
];
