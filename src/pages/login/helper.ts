export const passwordValidator = (val) => {
  if (!/^[a-z0-9_]{1,20}$/.test(val)) {
    return { result: false, message: '需要为1-20个英文或数字字符', type: 'error' };
  }
  if (val && val.indexOf('_') === -1) {
    return { result: false, message: '需包含下划线_', type: 'warning' };
  }
  return { result: true };
};

export const getEmails = (search) => [
  {
    value: `${search}@qq.com`,
    label: `${search}@qq.com`,
  },
  {
    value: `${search}@gmail.com`,
    label: `${search}@gmail.com`,
  },
  {
    value: `${search}@126.com`,
    label: `${search}@126.com`,
  },
  {
    value: `${search}@163.com`,
    label: `${search}@163.com`,
  },
  {
    value: `${search}@21cn.com`,
    label: `${search}@21cn.com`,
  },
  {
    value: `${search}@yahoo.com`,
    label: `${search}@yahoo.com`,
  },
];

export default {
  passwordValidator,
  getEmails,
};
