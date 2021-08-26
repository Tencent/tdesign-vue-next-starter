export const prefix = 'tdesign-pro';
export const theme = 'light';
// 登录方式设定，authenticationMethod取值有：smartProxy(走智能网关内网登录，要求.oa.co../.woa.co.. 等域名，且要求域名申请接入智能网关)
// customize(自定义登录，外网域名，统一重定向到登录页面)
// export const authenticationMethod = 'smartProxy';
export const authenticationMethod = 'customize';
export default {
  prefix,
  theme,
  authenticationMethod,
};
