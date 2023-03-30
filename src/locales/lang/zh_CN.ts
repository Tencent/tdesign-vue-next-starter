import tdesignLocale from 'tdesign-vue-next/es/locale/zh_CN';

export default {
  lang: '简体中文',
  components: {
    isSetup: {
      on: '已启用',
      off: '已停用',
    },
    manage: '管理',
    delete: '删除',
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
  layout: {
    header: {
      code: '代码仓库',
      help: '帮助文档',
      user: '个人中心',
      signOut: '退出登录',
      setting: '系统设置',
    },
    notice: {
      title: '通知中心',
      clear: '清空',
      setRead: '已读',
      empty: '空',
      emptyNotice: '暂无通知',
      viewAll: '查看全部',
    },
    searchPlaceholder: '请输入搜索内容',
    setting: {
      title: '页面配置',
      theme: {
        mode: '主题模式',
        color: '主题色',
        options: {
          light: '明亮',
          dark: '暗黑',
          auto: '跟随系统',
        },
      },
      navigationLayout: '导航布局',
      splitMenu: '分割菜单（混合模式下有效）',
      fixedSidebar: '固定侧边栏',
      element: {
        title: '元素开关',
        showHeader: '显示顶栏',
        showBreadcrumb: '显示面包屑',
        showFooter: '显示页脚',
        useTabs: '使用 多标签Tab页',
      },
      tips: '请复制后手动修改配置文件: /src/config/style.ts',
      copy: {
        title: '复制配置项',
        success: '复制成功',
        fail: '复制失败',
      },
    },
  },
  dashboard: {
    title: '仪表盘',
    base: {
      title: '概览仪表盘',
      outputOverview: {
        title: '出入库概览',
        subtitle: '(件)',
        export: '导出数据',
        month: {
          input: '本月入库总计（件）',
          output: '本月出库总计（件）',
        },
        since: '自从上周以来',
      },
      rankList: {
        title: '销售订单排名',
        week: '本周',
        month: '近三月',
        info: '详情',
      },
      topPanel: {
        card1: '总收入',
        card2: '总退款',
        card3: '活跃用户（个）',
        card4: '产生订单（个）',
        cardTips: '自从上周以来',
        analysis: {
          title: '统计数据',
          unit: '万元',
          series1: '本月',
          series2: '上月',
          channels: '销售渠道',
          channel1: '线上',
          channel2: '门店',
          channelTips: '销售占比',
        },
      },
      saleColumns: {
        index: '排名',
        productName: '客户名称',
        growUp: '较上周',
        count: '订单量',
        operation: '操作',
      },
      buyColumns: {
        index: '排名',
        productName: '供应商名称',
        growUp: '较上周',
        count: '订单量',
        operation: '操作',
      },
      chart: {
        week1: '周一',
        week2: '周二',
        week3: '周三',
        week4: '周四',
        week5: '周五',
        week6: '周六',
        week7: '周日',
        max: '最大值',
        min: '最小值',
      },
    },
    detail: {
      title: '统计报表',
      topPanel: {
        title: '本月采购申请情况',
        quarter: '环比',
        paneList: {
          totalRequest: '总申请数（次）',
          suppliers: '供应商数量（个）',
          productCategory: '采购商品品类（类）',
          applicant: '申请人数量（人）',
          completionRate: '申请完成率（%）',
          arrivalRate: '到货及时率（%）',
        },
      },
    },
  },
  home: {
    dashboard: '仪表盘',
    dashboardBase: '概览仪表盘',
    dashboardDetail: '统计报表',
  },
  tdesignLocale,
};
