// noinspection NonAsciiCharacters

import tdesignLocale from 'tdesign-vue-next/es/locale/en_US';
import merge from 'lodash/merge';

export default {
  layout: {
    searchHolder: 'enter search content',
    code: 'code repository',
    help: 'help document',
    user: 'your profile',
    signOut: 'sign out',
  },
  home: {
    dashboard: 'Dashboard',
    dashboardBase: 'Overview',
    dashboardDetail: 'Analysis',
    basePage: {
      card1: 'Total Revenue',
      card2: 'Total Refund',
      card3: 'Active User(s)',
      card4: 'Generate Order(s)',
      cardTips: 'since last week',
      analysis: {
        title: 'Analysis Data',
        unit: 'ten thousand yuan',
        series1: 'current month',
        series2: 'last month',
        channels: 'Sales Channels',
        channel1: 'online',
        channel2: 'shop',
        channelTips: ' sales ratio',
      },
    },
  },
  list: {
    home: 'List Page',
  },
  form: {
    home: 'Form Page',
  },
  detail: {
    home: 'Detail Page',
  },
  frame: {
    home: 'Frame Page',
  },
  result: {
    home: 'Result Page',
  },
  user: {
    home: 'Profile',
    login: {
      home: 'Login',
    },
  },
  tdesignLocale: merge(tdesignLocale, {
    // 可以在此处定义更多自定义配置，具体可配置内容参看 API 文档
    // https://tdesign.tencent.com/vue-next/config?tab=api
    // pagination: {
    //   jumpTo: 'xxx'
    // },
  }),
};
