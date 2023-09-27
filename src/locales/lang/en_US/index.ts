import merge from 'lodash/merge';
import componentsLocale from 'tdesign-vue-next/es/locale/en_US';

import components from './components';
import layout from './layout';
import pages from './pages';

export default {
  lang: 'English',
  layout,
  pages,
  components,
  router: {
    dashboard: 'Dashboard',
    dashboardBase: 'Overview',
    dashboardDetail: 'Analysis',
    userCenter: 'User Center',
    login: 'Login',
    resultSuccess: 'Success',
    resultFail: 'Fail',
    resultNetworkError: 'Network Error',
    result403: 'Forbidden',
    result404: 'Not Found',
    result500: 'Server Error',
    resultIncompatible: 'Incompatible',
    resultMaintenance: 'Maintenance',
  },
  constants: {
    contract: {
      statusOptions: {
        fail: 'Failure',
        auditPending: 'Pending audit',
        execPending: 'Pending performance',
        executing: 'Successful',
        finish: 'Finish',
      },
      typeOptions: {
        main: 'Master contract',
        sub: 'Subcontract',
        supplement: 'Supplementary contract',
      },
    },
  },
  componentsLocale: merge({}, componentsLocale, {
    // 可以在此处定义更多自定义配置，具体可配置内容参看 API 文档
    // https://tdesign.tencent.com/vue-next/config?tab=api
    // pagination: {
    //   jumpTo: 'xxx'
    // },
  }),
};
