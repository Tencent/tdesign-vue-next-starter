import merge from 'lodash/merge';
import componentsLocale from 'tdesign-vue-next/es/locale/en_US';

export default {
  lang: 'English',
  components: {
    isSetup: {
      on: 'Enabled',
      off: 'Disabled',
    },
    manage: 'Manage',
    delete: 'Delete',
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
  layout: {
    header: {
      code: 'Code repository',
      help: 'Help document',
      user: 'Your profile',
      signOut: 'Sign Out',
      setting: 'Setting',
    },
    notice: {
      title: 'Notification Center',
      clear: 'Clear',
      setRead: 'Set Read',
      empty: 'Empty',
      emptyNotice: 'No Notice',
      viewAll: 'View All',
    },
    searchPlaceholder: 'Enter search content',
    setting: {
      title: 'Page Setting',
      theme: {
        mode: 'Theme Mode',
        color: 'Theme Color',
        options: {
          light: 'Light',
          dark: 'Dark ',
          auto: 'Follow System',
        },
      },
      navigationLayout: 'Navigation Layout',
      splitMenu: 'Split Menu（Only Mix mode）',
      fixedSidebar: 'Fixed Sidebar',
      element: {
        title: 'Element Switch',
        showHeader: 'Show Header',
        showBreadcrumb: 'Show Breadcrumb',
        showFooter: 'Show Footer',
        useTabs: 'Use Tabs',
      },
      tips: 'Please copy and manually modify the configuration file: /src/config/style.ts',
      copy: {
        title: 'Copy config',
        success: 'Copy success',
        fail: 'Copy fail',
      },
    },
  },
  dashboard: {
    title: 'Dashboard',
    base: {
      title: 'Overview',
      outputOverview: {
        title: 'In/Out Overview',
        subtitle: '(pieces)',
        export: 'Export data',
        month: {
          input: 'Total in store this month (pieces)',
          output: 'Total out store this month (pieces)',
        },
        since: 'Since last week',
      },
      rankList: {
        title: 'Sales order ranking',
        week: 'This week',
        month: 'Nearly three months',
        info: 'Info',
      },
      topPanel: {
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
      saleColumns: {
        index: 'Ranking',
        productName: 'Customer',
        growUp: 'Grow up',
        count: 'Count',
        operation: 'Operation',
      },
      buyColumns: {
        index: 'Ranking',
        productName: 'Supplier',
        growUp: 'Grow up',
        count: 'Count',
        operation: 'Operation',
      },
      chart: {
        week1: 'MON',
        week2: 'TUE',
        week3: 'WED',
        week4: 'THU',
        week5: 'FRI',
        week6: 'SAT',
        week7: 'SUN',
        max: 'Max',
        min: 'Min',
      },
    },
    detail: {
      title: 'Analysis',
      topPanel: {
        title: 'Purchase applications for this month',
        quarter: 'Quarter on quarter',
      },
    },
  },
  home: {
    dashboard: 'Dashboard',
    dashboardBase: 'Overview',
    dashboardDetail: 'Analysis',
  },
  componentsLocale: merge({}, componentsLocale, {
    // 可以在此处定义更多自定义配置，具体可配置内容参看 API 文档
    // https://tdesign.tencent.com/vue-next/config?tab=api
    // pagination: {
    //   jumpTo: 'xxx'
    // },
  }),
};
