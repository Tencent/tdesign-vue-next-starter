import dayjs from 'dayjs';
import * as echarts from 'echarts/core';
import { getBrandColor } from '@/config/color';
import store from '@/store';
import { CommonObjType } from '@/interface';

const { state } = store;

/**
 * 依据主题类型获取颜色
 *
 * @export
 * @param {string} theme
 * @returns {}
 */
export function getColorFromTheme(theme: string) {
  const themeColor = getBrandColor(theme);
  const themeColorList: Array<string> = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const key in themeColor) {
    if (Object.prototype.hasOwnProperty.call(themeColor, key)) {
      const elementColor = themeColor[key];

      themeColorList.push(elementColor);
    }
  }

  return themeColorList;
}

/** 图表颜色 */
function chartListColor(): Array<string> {
  const colorList: Array<string> = ['#0052D9', '#BCC4D0', '#7D46BD', '#0594FA', '#ED7B2F'];
  const { setting } = state as any;

  return getColorFromTheme(setting.brandTheme) || colorList;
}

/**
 * 获取表头数据
 *
 * @export
 * @param {string[]} dateTime
 * @param {number} divideNum
 * @returns {string[]}
 */
export function getDateArray(dateTime: string[] = [], divideNum = 10): string[] {
  const timeArray: string[] = [];
  if (dateTime.length > 0) {
    for (let i = 0; i < divideNum; i++) {
      const dateAbsTime: number = (new Date(dateTime[1]).getTime() - new Date(dateTime[0]).getTime()) / divideNum;
      const enhandTime: number = new Date(dateTime[0]).getTime() + dateAbsTime * i;
      timeArray.push(dayjs(enhandTime).format('YYYY-MM-DD'));
    }
  }

  return timeArray;
}

/**
 * 获取随机数
 *
 * @param {number} [num=100]
 * @returns
 *
 * @memberOf DashboardBase
 */
export function getRandomArray(num = 100) {
  let resultNum = Number((Math.random() * num).toFixed(0));

  if (resultNum <= 1) {
    resultNum = 1;
  }

  return resultNum;
}

/** 首页 dashbord 折线图 */
export function constructInitDashbordDataset(type: string) {
  const dateArray: Array<string> = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const datasetAxis = {
    xAxis: {
      type: 'category',
      show: false,
      data: dateArray,
    },
    yAxis: {
      show: false,
      type: 'value',
    },
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  };

  if (type === 'line') {
    const lineDataset = {
      ...datasetAxis,
      color: ['#fff'],
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type,
          showSymbol: true,
          symbol: 'circle',
          symbolSize: 0,
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' },
            ],
          },
          itemStyle: {
            normal: {
              lineStyle: {
                width: 2,
              },
            },
          },
        },
      ],
    };
    return lineDataset;
  }
  const barDataset = {
    ...datasetAxis,
    color: chartListColor(),
    series: [
      {
        data: [
          100,
          130,
          184,
          218,
          {
            value: 135,
            itemStyle: {
              color: chartListColor()[1],
            },
          },
          {
            value: 118,
            itemStyle: {
              color: chartListColor()[1],
            },
          },
          {
            value: 60,
            itemStyle: {
              color: chartListColor()[1],
            },
          },
        ],
        type,
        barWidth: 9,
      },
    ],
  };
  return barDataset;
}

/** 柱状图数据源 */
export function constructInitDataset(dateTime: Array<string> = []) {
  // const dataset: Array<Array<string>> = [['时间'], ['入库'], ['出库']];
  const divideNum = 10;
  const timeArray = [];
  const inArray = [];
  const outArray = [];
  for (let i = 0; i < divideNum; i++) {
    // const [timeArray, inArray, outArray] = dataset;
    if (dateTime.length > 0) {
      const dateAbsTime: number = (new Date(dateTime[1]).getTime() - new Date(dateTime[0]).getTime()) / divideNum;
      const enhandTime: number = new Date(dateTime[0]).getTime() + dateAbsTime * i;
      // console.log('dateAbsTime..', dateAbsTime, enhandTime);
      timeArray.push(dayjs(enhandTime).format('YYYY-MM-DD'));
    } else {
      timeArray.push(
        dayjs()
          .subtract(divideNum - i, 'day')
          .format('YYYY-MM-DD'),
      );
    }

    inArray.push(getRandomArray().toString());
    outArray.push(getRandomArray().toString());
  }

  // console.log('timeArray..', timeArray);

  const dataset = {
    color: chartListColor(),
    tooltip: {
      trigger: 'item',
    },
    xAxis: {
      type: 'category',
      data: timeArray,
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.4)',
      },
      axisLine: {
        lineStyle: {
          color: chartListColor()[1],
          width: 1,
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.4)',
      },
    },
    grid: {
      top: '5%',
      left: '25px',
      right: 0,
      bottom: '60px',
    },
    legend: {
      icon: 'rect',
      itemWidth: 12,
      itemHeight: 4,
      itemGap: 48,
      textStyle: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.6)',
      },
      left: 'center',
      bottom: '0',
      orient: 'horizontal',
      data: ['本月', '上月'],
    },
    series: [
      {
        name: '本月',
        data: outArray,
        type: 'bar',
      },
      {
        name: '上月',
        data: inArray,
        type: 'bar',
        itemStyle: {
          normal: {
            color: chartListColor()[1],
          },
        },
      },
    ],
  };

  return dataset;
}

/** 平滑图数据 */
export function getSmoothLineDataSet(dateTime = []) {
  let dateArray: Array<string> = ['00:00', '02:00', '04:00', '06:00'];
  if (dateTime.length > 0) {
    const devideNum = 7;
    dateArray = getDateArray(dateTime, devideNum);
  }

  return {
    color: chartListColor(),
    tooltip: {
      trigger: 'item',
    },
    grid: {
      top: '10px',
      left: '0',
      right: '20px',
      bottom: '36px',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: dateArray,
      boundaryGap: false,
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.4)',
      },
      axisLine: {
        lineStyle: {
          color: '#E3E6EB',
          width: 1,
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.4)',
      },
    },
    legend: {
      data: ['本月', '上月'],
      icon: 'circle',
      bottom: '0',
      itemGap: 48,
      itemHeight: 8,
      itemWidth: 8,
    },
    series: [
      {
        name: '上月',
        data: [
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
        ],
        type: 'line',
        smooth: true,
        color: chartListColor()[0],
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        areaStyle: {
          normal: {
            color: '#0053D92F',
          },
        },
      },
      {
        name: '本月',
        data: [
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
        ],
        type: 'line',
        smooth: true,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        color: chartListColor()[1],
      },
    ],
  };
}

/** 折线图数据 */
export function getFolderLineDataSet(dateTime?: string[]) {
  let dateArray: Array<string> = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  if (dateTime && dateTime.length > 0) {
    const devideNum = 7;
    dateArray = getDateArray(dateTime, devideNum);
  }

  return {
    color: chartListColor(),
    grid: {
      top: '5%',
      right: '1px',
      left: '30px',
      bottom: '60px',
    },
    legend: {
      left: 'center',
      bottom: '0',
      orient: 'horizontal', // legend 横向布局。
      data: ['杯子', '茶叶', '蜂蜜', '面粉'],
    },
    xAxis: {
      type: 'category',
      data: dateArray,
      boundaryGap: false,
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.4)',
      },
      axisLine: {
        lineStyle: {
          color: '#E3E6EB',
          width: 1,
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.4)',
      },
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        name: '杯子',
        stack: '总量',
        data: [
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
        ],
        type: 'line',
        itemStyle: {
          normal: {
            borderColor: '#ffffff',
            borderWidth: 1,
          },
        },
      },
      {
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        name: '茶叶',
        stack: '总量',
        data: [
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
        ],
        type: 'line',
        itemStyle: {
          normal: {
            borderColor: '#ffffff',
            borderWidth: 1,
          },
        },
      },
      {
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        name: '蜂蜜',
        stack: '总量',
        data: [
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
        ],
        type: 'line',
        itemStyle: {
          normal: {
            borderColor: '#ffffff',
            borderWidth: 1,
          },
        },
      },
      {
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        name: '面粉',
        stack: '总量',
        data: [
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
        ],
        type: 'line',
        itemStyle: {
          normal: {
            borderColor: '#ffffff',
            borderWidth: 1,
          },
        },
      },
    ],
  };
}

/**
 *  线性图表数据源
 *
 * @export
 * @param {Array<string>} [dateTime=[]]
 * @returns {*}
 */
export function getLineChartDataSet(dateTime: Array<string> = []) {
  const divideNum = 10;
  const timeArray = [];
  const inArray = [];
  const outArray = [];
  for (let i = 0; i < divideNum; i++) {
    // const [timeArray, inArray, outArray] = dataset;
    if (dateTime.length > 0) {
      const dateAbsTime: number = (new Date(dateTime[1]).getTime() - new Date(dateTime[0]).getTime()) / divideNum;
      const enhandTime: number = new Date(dateTime[0]).getTime() + dateAbsTime * i;
      // console.log('dateAbsTime..', dateAbsTime, enhandTime);
      timeArray.push(dayjs(enhandTime).format('MM-DD'));
    } else {
      timeArray.push(
        dayjs()
          .subtract(divideNum - i, 'day')
          .format('MM-DD'),
      );
    }

    inArray.push(getRandomArray().toString());
    outArray.push(getRandomArray().toString());
  }
  const dataSet = {
    color: chartListColor(),
    tooltip: {
      trigger: 'item',
    },
    grid: {
      left: '0',
      right: '20px',
      top: '5px',
      bottom: '36px',
      containLabel: true,
    },
    legend: {
      left: 'center',
      bottom: '0',
      orient: 'horizontal', // legend 横向布局。
      data: ['本月', '上月'],
      textStyle: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.6)',
      },
    },
    xAxis: {
      type: 'category',
      data: timeArray,
      boundaryGap: false,
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.4)',
      },
      axisLine: {
        lineStyle: {
          color: '#E3E6EB',
          width: 1,
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.4)',
      },
    },
    series: [
      {
        name: '本月',
        data: outArray,
        type: 'line',
        smooth: false,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            borderColor: '#ffffff',
            borderWidth: 1,
          },
          // hover color
          // emphasis: {
          //   color: '#000000'
          // }
        },
        areaStyle: {
          normal: {
            color: '#0053D92F',
          },
        },
      },
      {
        name: '上月',
        data: inArray,
        type: 'line',
        smooth: false,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            borderColor: '#ffffff',
            color: '#BCC4D0',
            lineStyle: {
              color: '#BCC4D0',
            },
            borderWidth: 1,
          },
          // hover color
          // emphasis: {
          //   color: '#000000'
          // }
        },
      },
    ],
  };
  return dataSet;
}

/**
 * 获取表行数据
 *
 * @export
 * @param {string} productName
 * @param {number} devideNum
 */
export function getSelftItemList(productName: string, devideNum: number): string[] {
  const productArray: string[] = [productName];
  for (let i = 0; i < devideNum; i++) {
    productArray.push(getRandomArray(100 * i).toString());
  }

  return productArray;
}

/**
 * 散点图数据
 *
 * @export
 * @returns {}
 */
export function getScatterDataSet(dateTime: Array<string> = []) {
  const divideNum = 10;
  const timeArray = [];
  const inArray = [];
  const outArray = [];
  for (let i = 0; i < divideNum; i++) {
    // const [timeArray, inArray, outArray] = dataset;
    if (dateTime.length > 0) {
      const dateAbsTime: number = (new Date(dateTime[1]).getTime() - new Date(dateTime[0]).getTime()) / divideNum;
      const enhandTime: number = new Date(dateTime[0]).getTime() + dateAbsTime * i;
      // console.log('dateAbsTime..', dateAbsTime, enhandTime);
      timeArray.push(dayjs(enhandTime).format('MM-DD'));
    } else {
      timeArray.push(
        dayjs()
          .subtract(divideNum - i, 'day')
          .format('MM-DD'),
      );
    }

    inArray.push(getRandomArray().toString());
    outArray.push(getRandomArray().toString());
  }

  return {
    color: chartListColor(),
    xAxis: {
      data: timeArray,
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.4)',
      },
      splitLine: { show: false },
      axisLine: {
        lineStyle: {
          color: '#E3E6EB',
          width: 1,
        },
      },
    },
    yAxis: {
      type: 'value',
      // splitLine: { show: false},
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.4)',
      },
      nameTextStyle: {
        padding: [0, 0, 0, 60],
      },
      axisTick: {
        show: false,
        axisLine: {
          show: false,
        },
      },
      axisLine: {
        show: false,
      },
    },
    tooltip: {
      trigger: 'item',
    },
    grid: {
      top: '5px',
      left: '25px',
      right: '5px',
      bottom: '60px',
    },
    legend: {
      left: 'center',
      bottom: '0',
      orient: 'horizontal', // legend 横向布局。
      data: ['按摩仪', '咖啡机'],
      itemHeight: 8,
      itemWidth: 8,
    },
    series: [
      {
        name: '按摩仪',
        symbolSize: 10,
        data: outArray.reverse(),
        type: 'scatter',
      },
      {
        name: '咖啡机',
        symbolSize: 10,
        data: inArray.concat(inArray.reverse()),
        type: 'scatter',
      },
    ],
  };
}

/**
 * 获域图数据结构
 *
 * @export
 * @returns {}
 */
export function getAreaChartDataSet() {
  const xAxisData = [];
  const data1 = [];
  const data2 = [];
  for (let i = 0; i < 50; i++) {
    xAxisData.push(`${i}`);
    data1.push((getRandomArray() * Math.sin(i / 5) * (i / 5 - 5) + i / 6) * 2);
    data2.push((getRandomArray() * Math.cos(i / 5) * (i / 5 - 5) + i / 6) * 2);
  }

  return {
    color: chartListColor(),
    // title: {
    //   text: '柱状图动画延迟',
    // },
    legend: {
      left: 'center',
      bottom: '5%',
      orient: 'horizontal',
      data: ['测试', '上线'],
    },
    tooltip: {
      trigger: 'item',
    },
    xAxis: {
      data: xAxisData,
      splitLine: {
        show: false,
      },
    },
    yAxis: {},
    series: [
      {
        name: '测试',
        type: 'bar',
        data: data1,
        emphasis: {
          focus: 'series',
        },
        animationDelay(idx: number) {
          return idx * 10;
        },
      },
      {
        name: '上线',
        type: 'bar',
        data: data2,
        emphasis: {
          focus: 'series',
        },
        animationDelay(idx: number) {
          return idx * 10 + 100;
        },
      },
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate(idx: number) {
      return idx * 5;
    },
  };
}

/**
 * 柱状图数据结构
 *
 * @export
 * @param {boolean} [isMonth=false]
 * @returns {*}
 */
export function getColumnChartDataSet(isMonth = false) {
  if (isMonth) {
    return {
      color: chartListColor(),
      legend: {
        left: 'center',
        top: '10%',
        orient: 'horizontal', // legend 横向布局。
        data: ['直接访问'],
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['1', '4', '8', '12', '16', '20', '24'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [
            getRandomArray(Math.random() * 100),
            getRandomArray(Math.random() * 200),
            getRandomArray(Math.random() * 300),
            getRandomArray(Math.random() * 400),
            getRandomArray(Math.random() * 500),
            getRandomArray(Math.random() * 600),
            getRandomArray(Math.random() * 700),
          ],
        },
      ],
    };
  }
  return {
    color: chartListColor(),
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      left: 'center',
      bottom: '0%',
      orient: 'horizontal', // legend 横向布局。
      data: ['直接访问'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '13%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '直接访问',
        type: 'bar',
        barWidth: '20%',
        data: [
          getRandomArray(Math.random() * 100),
          getRandomArray(Math.random() * 200),
          getRandomArray(Math.random() * 300),
          getRandomArray(Math.random() * 400),
          getRandomArray(Math.random() * 500),
          getRandomArray(Math.random() * 600),
          getRandomArray(Math.random() * 700),
        ],
      },
    ],
  };
}

export const lastYearList: Array<any> = [100, 120, 140, 160, 180, 200, 210];

/**
 * 柱状图数据结构
 *
 * @export
 * @param {boolean} [isMonth=false]
 * @returns {*}
 */
export function get2ColBarChartDataSet(isMonth = false) {
  let lastYearListCopy = lastYearList.concat([]);
  let thisYearListCopy = lastYearList.concat([]);

  if (isMonth) {
    lastYearListCopy = lastYearListCopy.reverse();
    thisYearListCopy = thisYearListCopy.reverse();
  }

  return {
    color: chartListColor(),
    tooltip: {
      trigger: 'item',
    },
    grid: {
      top: '10px',
      left: '0',
      right: '0',
      bottom: '36px',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          color: 'rgba(0, 0, 0, 0.4)',
        },
        axisLine: {
          lineStyle: {
            color: '#E3E6EB',
            width: 1,
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          color: 'rgba(0, 0, 0, 0.4)',
        },
      },
    ],
    legend: {
      data: ['去年', '今年'],
      bottom: '0',
      icon: 'rect',
      itemGap: 48,
      itemHeight: 4,
      itemWidth: 12,
      itemStyle: {},
    },
    series: [
      {
        name: '去年',
        type: 'bar',
        barWidth: '30%',
        data: lastYearListCopy,
        itemStyle: {
          color: '#BCC4D0',
        },
      },
      {
        name: '今年',
        type: 'bar',
        barWidth: '30%',
        data: thisYearListCopy,
        itemStyle: {
          color: (params: CommonObjType) => {
            if (params.value >= 200) {
              return '#E34D59';
            }
            return '#0052D9';
          },
        },
      },
    ],
  };
}

/**
 * 获取饼图数据
 *
 * @export
 * @param {number} [radius=1]
 * @returns {*}
 */
export function getPieChartDataSet(radius = 42) {
  return {
    color: chartListColor(),
    tooltip: {
      show: false,
      trigger: 'axis',
      position: null,
    },
    grid: {
      top: '0',
      right: '0',
    },
    legend: {
      selectedMode: false,
      itemWidth: 12,
      itemHeight: 4,
      textStyle: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.6)',
      },
      left: 'center',
      bottom: '0',
      orient: 'horizontal', // legend 横向布局。
    },
    series: [
      {
        name: '销售渠道',
        type: 'pie',
        radius: ['48%', '60%'],
        avoidLabelOverlap: true,
        selectedMode: true,
        hoverAnimation: true,
        silent: true,
        label: {
          show: true,
          position: 'center',
          formatter: ['{value|{d}%}', '{name|{b}渠道占比}'].join('\n'),
          rich: {
            value: {
              color: '#303133',
              fontSize: 28,
              fontWeight: 'normal',
              lineHeight: 46,
            },
            name: {
              color: '#909399',
              fontSize: 12,
              lineHeight: 14,
            },
          },
        },
        emphasis: {
          label: {
            show: true,
            formatter: ['{value|{d}%}', '{name|{b}渠道占比}'].join('\n'),
            rich: {
              value: {
                color: '#303133',
                fontSize: 28,
                fontWeight: 'normal',
                lineHeight: 46,
              },
              name: {
                color: '#909399',
                fontSize: 14,
                lineHeight: 14,
              },
            },
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '线上' },
          { value: radius * 7, name: '门店' },
        ],
      },
    ],
  };
}

/**
 * 更改图表主题颜色
 *
 * @export
 * @param {Array<string>} chartsList
 * @param {string} theme
 */
export function changeChartsTheme(chartsList: echarts.EChartsType[]) {
  if (chartsList && chartsList.length) {
    const chartChangeColor: any = chartListColor();

    for (let index = 0; index < chartsList.length; index++) {
      const elementChart: any = chartsList[index];

      if (elementChart) {
        const optionVal: any = elementChart.getOption();

        // 更改主题颜色
        optionVal.color = chartChangeColor;

        elementChart.setOption(optionVal);
      }
    }
  }
}
