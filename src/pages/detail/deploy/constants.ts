export const BASE_INFO_DATA = [
  {
    name: '集群名',
    value: 'helloworld',
    type: null,
  },
  {
    name: '集群ID',
    value: 'cls - 2ntelvxw',
    type: {
      key: 'color',
      value: 'blue',
    },
  },
  {
    name: '状态',
    value: '运行中',
    type: {
      key: 'color',
      value: 'green',
    },
  },
  {
    name: 'K8S版本',
    value: '1.7.8',
    type: null,
  },
  {
    name: '配置',
    value: '6.73 核 10.30 GB',
    type: null,
  },
  {
    name: '所在地域',
    value: '广州',
    type: null,
  },
  {
    name: '新增资源所属项目',
    value: '默认项目',
    type: null,
  },
  {
    name: '节点数量',
    value: '4 个',
    type: null,
  },
  {
    name: '节点网络',
    value: 'vpc - 5frmkm1x',
    type: {
      key: 'color',
      value: 'blue',
    },
  },
  {
    name: '容器网络',
    value: '172.16.0.0 / 16',
    type: null,
  },
  {
    name: '集群凭证',
    value: '显示凭证',
    type: {
      key: 'color',
      value: 'blue',
    },
  },
  {
    name: '创建/更新',
    value: '2018-05-31 22:11:44 2018-05-31 22:11:44',
    type: {
      key: 'contractAnnex',
      value: 'pdf',
    },
  },
  {
    name: '描述',
    value: 'istio_test',
    type: null,
  },
];

export const TABLE_COLUMNS = [
  {
    width: '448',
    ellipsis: true,
    colKey: 'name',
    title: '项目名称',
    sorter: (a, b) => a.name.substr(10) - b.name.substr(10),
  },
  {
    width: '448',
    ellipsis: true,
    colKey: 'adminName',
    title: '管理员',
  },
  {
    width: '448',
    className: 'test',
    ellipsis: true,
    colKey: 'updateTime',
    title: '创建时间',
    sorter: (a, b) => Date.parse(a.updateTime) - Date.parse(b.updateTime),
  },
  {
    align: 'left',
    width: '200',
    className: 'test2',
    ellipsis: true,
    colKey: 'op',
    fixed: 'right',
    title: '操作',
  },
];
