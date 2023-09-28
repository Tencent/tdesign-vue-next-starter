import componentsLocale from 'tdesign-vue-next/es/locale/zh_CN';

import components from './components';
import layout from './layout';
import pages from './pages';

export default {
  lang: '简体中文',
  layout,
  pages,
  components,
  router: {
    dashboard: '仪表盘',
    dashboardBase: '概览仪表盘',
    dashboardDetail: '统计报表',
    login: '登录页',
    userCenter: '个人中心',
    resultSuccess: '成功页',
    resultFail: '失败页',
    resultNetworkError: '网络异常',
    result403: '成功页',
    result404: '成功页',
    result500: '服务器出错页',
    resultIncompatible: '不兼容页',
    resultMaintenance: '系统维护页',
  },
  constants: {
    contract: {
      statusOptions: {
        fail: '审核失败',
        auditPending: '待审核',
        execPending: '待履行',
        executing: '审核成功',
        finish: '已完成',
      },
      typeOptions: {
        main: '主合同',
        sub: '子合同',
        supplement: '补充合同',
      },
    },
  },
  componentsLocale,
};
