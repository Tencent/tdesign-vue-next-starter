export const passwordValidator = (val) => {
  if (!/^[a-z0-9_]{1,20}$/.test(val)) {
    return { result: false, message: '需要为1-20个英文或数字字符', type: 'error' };
  }
  if (val && val.indexOf('_') === -1) {
    return { result: false, message: '需包含下划线_', type: 'warning' };
  }
  return { result: true };
};

export default {
  passwordValidator,
};
