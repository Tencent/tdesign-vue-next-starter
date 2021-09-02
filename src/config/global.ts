export const PREFIX = 'tdesign-pro';
export const THEME = 'light';
// 登录方式设定，authenticationMethod取值有：smartProxy(走智能网关内网登录，要求.oa.co../.woa.co.. 等域名，且要求域名申请接入智能网关)
// customize(自定义登录，外网域名，统一重定向到登录页面)
// export const authenticationMethod = 'smartProxy';
export const AUTHENTICATION_METHOD = 'customize';
export default {
  PREFIX,
  THEME,
  AUTHENTICATION_METHOD,
};
