export const FORM_RULES = {
  name: [{ required: true, message: '请选择合同名称', type: 'error' }],
  type: [{ required: true, message: '请选择发票类型', type: 'error' }],
  title: [{ required: true, message: '请输入发票抬头', type: 'error' }],
  taxNum: [{ required: true, message: '请输入纳税人识别号', type: 'error' }],
  consignee: [{ required: true, message: '请输入收货人', type: 'error' }],
  mobileNum: [{ required: true, message: '请输入手机号码', type: 'error' }],
  deliveryAddress: [{ required: true, message: '请选择收货地址', type: 'error' }],
  fullAddress: [{ required: true, message: '请输入详细地址', type: 'error' }],
};

export const NAME_OPTIONS = [
  { label: '合同A', value: '1' },
  { label: '合同B', value: '2' },
  { label: '合同C', value: '3' },
];

export const TYPE_OPTIONS = [
  { label: '类型A', value: '1' },
  { label: '类型B', value: '2' },
  { label: '类型C', value: '3' },
];

export const ADDRESS_OPTIONS = [
  { label: '广东省深圳市南山区', value: '1' },
  { label: '北京市海淀区', value: '2' },
  { label: '上海市徐汇区', value: '3' },
  { label: '四川省成都市高新区', value: '4' },
  { label: '广东省广州市天河区', value: '5' },
  { label: '陕西省西安市高新区', value: '6' },
];

export const INITIAL_DATA1 = {
  name: '',
  type: '',
};

export const INITIAL_DATA2 = {
  title: '',
  taxNum: '',
  address: '',
  bank: '',
  bankAccount: '',
  email: '',
  tel: '',
};

export const INITIAL_DATA3 = {
  consignee: '',
  mobileNum: '',
  deliveryAddress: '',
  fullAddress: '',
};
