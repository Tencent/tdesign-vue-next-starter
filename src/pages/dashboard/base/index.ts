import { getBrandColor } from '@/config/color';
import dayjs, { Dayjs } from 'dayjs';

/** 图表颜色 */
let chartListColor: Array<string> = ['#0052D9', '#BCC4D0', '#7D46BD', '#0594FA', '#ED7B2F'];

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
export class DashboardBase {
  /** 更新容器尺寸 */
  setContainerSize(containerCopyValue: HTMLElement, absWidth = 0, absHeight = 0): void {
    const container = containerCopyValue;
    try {
      if (container && container.style && container.parentElement) {
        container.style.width = `${container.parentElement.clientWidth - absWidth}px`;
        container.style.height = `${container.parentElement.clientHeight - absHeight}px`;
      }
    } catch (error) {
      // hook
    }
  }
}

/**
 * 获取随机数
 *
 * @param {number} [num=100]
 * @returns
 *
 * @memberOf DashboardBase
 */
export function getRandomArray(num = 100): number {
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
        },
      ],
    };
    return lineDataset;
  }
  if (type === 'bar') {
    const barDataset = {
      ...datasetAxis,
      color: chartListColor,
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
                color: '#ECF2FE',
              },
            },
            {
              value: 118,
              itemStyle: {
                color: '#ECF2FE',
              },
            },
            {
              value: 60,
              itemStyle: {
                color: '#ECF2FE',
              },
            },
          ],
          type,
        },
      ],
    };
    return barDataset;
  }
}

/** 柱状图数据源 */
export function constructInitDataset(dateTime: Array<Dayjs> = []) {
  // const dataset: Array<Array<string>> = [['时间'], ['入库'], ['出库']];
  const divideNum = 10;
  const timeArray = [];
  const inArray = [];
  const outArray = [];
  for (let i = 0; i < divideNum; i++) {
    // const [timeArray, inArray, outArray] = dataset;
    if (dateTime.length > 0) {
      const dateAbsTime: number = (dateTime[1].valueOf() - dateTime[0].valueOf()) / divideNum;
      const enhandTime: number = dateTime[0].valueOf() + dateAbsTime * i;
      // console.log('dateAbsTime..', dateAbsTime, enhandTime);
      timeArray.push(dayjs(enhandTime).format('YYYY-MM-DD'));
    } else {
      timeArray.push(dayjs()
        .subtract(divideNum - i, 'day')
        .format('YYYY-MM-DD'));
    }

    inArray.push(getRandomArray().toString());
    outArray.push(getRandomArray().toString());
  }

  // console.log('timeArray..', timeArray);

  const dataset = {
    color: chartListColor,
    tooltip: {
      trigger: 'item',
    },
    xAxis: {
      type: 'category',
      data: timeArray,
    },
    yAxis: {
      type: 'value',
    },
    grid: {
      top: '5%',
      left: '25px',
      right: 0,
      bottom: '60px',
    },
    legend: {
      left: 'center',
      bottom: '0',
      orient: 'horizontal',
      data: ['出库', '入库'],
    },
    series: [
      {
        name: '出库',
        data: outArray,
        type: 'bar',
      },
      {
        name: '入库',
        data: inArray,
        type: 'bar',
      },
    ],
  };

  return dataset;
}

/** 平滑图数据 */
export function getSmoothLineDataSet(dateTime: any = []): any {
  let dateArray: Array<string> = ['00:00', '02:00', '04:00', '06:00'];
  if (dateTime.length > 0) {
    const devideNum = 7;
    dateArray = getDateArray(dateTime, devideNum);
  }

  return {
    color: chartListColor,
    xAxis: {
      type: 'category',
      data: dateArray,
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      data: ['本月', '上月'],
      icon: 'roundRect',
      bottom: '15%',
      itemGap: 60,
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
        color: '#BCC4D0',
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
        areaStyle: {
          opacity: 0.1,
        },
        color: '#0052D9',
      },
    ],
  };
}

/** 折线图数据 */
export function getFolderlineDataSet(dateTime: any = []): any {
  let dateArray: Array<string> = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  if (dateTime.length > 0) {
    const devideNum = 7;
    dateArray = getDateArray(dateTime, devideNum);
  }

  return {
    color: chartListColor,
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
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
export function getLineChartDataSet(checkedValues = ''): any {
  let dateValueList = [];
  if (checkedValues === 'monthVal') {
    dateValueList = ['1', '3', '8', '13', '18', '23', '28'];
  } else {
    dateValueList = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  }
  const dataSet = {
    color: chartListColor,
    tooltip: {
      trigger: 'item',
    },
    grid: {
      left: '0',
      right: '0',
      top: '5px',
      bottom: '36px',
      containLabel: true,
    },
    legend: {
      left: 'center',
      bottom: '0',
      orient: 'horizontal', // legend 横向布局。
      data: ['付款金额', '收款金额'],
    },
    xAxis: {
      type: 'category',
      data: dateValueList,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '付款金额',
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
      },
      {
        name: '收款金额',
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
      },
    ],
  };
  // console.log('getLineChartDataSet..', dataSet);
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
 * @returns {any[]}
 */
export function getScattlerDataSet(): any {
  return {
    color: chartListColor,
    xAxis: {},
    yAxis: {},
    tooltip: {
      trigger: 'item',
    },
    grid: {
      top: '5%',
      left: '18px',
      right: '5px',
      bottom: '60px',
    },
    legend: {
      left: 'center',
      bottom: '0',
      orient: 'horizontal', // legend 横向布局。
      data: ['满意度'],
    },
    series: [
      {
        name: '满意度',
        symbolSize: 10,
        data: [
          [getRandomArray(Math.random() * 10.0), getRandomArray(Math.random() * 8.04)],
          [getRandomArray(Math.random() * 8.07), getRandomArray(Math.random() * 6.95)],
          [getRandomArray(Math.random() * 13.0), getRandomArray(Math.random() * 7.58)],
          [getRandomArray(Math.random() * 9.05), getRandomArray(Math.random() * 8.81)],
          [getRandomArray(Math.random() * 11.0), getRandomArray(Math.random() * 8.33)],
          [getRandomArray(Math.random() * 14.0), getRandomArray(Math.random() * 7.66)],
          [getRandomArray(Math.random() * 13.4), getRandomArray(Math.random() * 6.81)],
          [getRandomArray(Math.random() * 10.0), getRandomArray(Math.random() * 6.33)],
          [getRandomArray(Math.random() * 14.0), getRandomArray(Math.random() * 8.96)],
          [getRandomArray(Math.random() * 12.5), getRandomArray(Math.random() * 6.82)],
          [getRandomArray(Math.random() * 9.15), getRandomArray(Math.random() * 7.2)],
          [getRandomArray(Math.random() * 11.5), getRandomArray(Math.random() * 7.2)],
          [getRandomArray(Math.random() * 3.03), getRandomArray(Math.random() * 4.23)],
          [getRandomArray(Math.random() * 12.2), getRandomArray(Math.random() * 7.83)],
          [getRandomArray(Math.random() * 2.02), getRandomArray(Math.random() * 4.47)],
          [getRandomArray(Math.random() * 1.05), getRandomArray(Math.random() * 3.33)],
          [getRandomArray(Math.random() * 4.05), getRandomArray(Math.random() * 4.96)],
          [getRandomArray(Math.random() * 6.03), getRandomArray(Math.random() * 7.24)],
          [getRandomArray(Math.random() * 12.0), getRandomArray(Math.random() * 6.26)],
          [getRandomArray(Math.random() * 12.0), getRandomArray(Math.random() * 8.84)],
          [getRandomArray(Math.random() * 7.08), getRandomArray(Math.random() * 5.82)],
          [getRandomArray(Math.random() * 5.02), getRandomArray(Math.random() * 5.68)],
        ],
        type: 'scatter',
      },
    ],
  };
}

/**
 * 获域图数据结构
 *
 * @export
 * @returns {any[]}
 */
export function getAreaChartDataSet(text = ''): any {
  console.log(text);

  const xAxisData = [];
  const data1 = [];
  const data2 = [];
  for (let i = 0; i < 50; i++) {
    xAxisData.push(`${i}`);
    data1.push((getRandomArray() * Math.sin(i / 5) * (i / 5 - 5) + i / 6) * 2);
    data2.push((getRandomArray() * Math.cos(i / 5) * (i / 5 - 5) + i / 6) * 2);
  }

  return {
    color: chartListColor,
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
        animationDelay(idx) {
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
        animationDelay(idx) {
          return idx * 10 + 100;
        },
      },
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate(idx) {
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
export function getColumnChartDataSet(isMonth = false): any {
  if (isMonth) {
    return {
      color: chartListColor,
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
    color: chartListColor,
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

/**
 * 柱状图数据结构
 *
 * @export
 * @param {boolean} [isMonth=false]
 * @returns {*}
 */
export function get2ColBarChartDataSet(): any {
  return {
    color: chartListColor,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    grid: {
      top: '0',
      left: '0',
      right: '0',
      // bottom: '10%',
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
    legend: {
      data: ['去年', '今年'],
      bottom: '0',
      itemGap: 60,
    },
    series: [
      {
        name: '去年',
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
        itemStyle: {
          color: '#BCC4D0',
        },
      },
      {
        name: '今年',
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
        itemStyle: {
          color: (params) => {
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
export function getPieChartDataSet(radius = 42): any {
  return {
    color: chartListColor,
    tooltip: {
      trigger: 'item',
    },
    grid: {
      top: '0',
      right: '0',
    },
    legend: {
      left: 'center',
      bottom: '0',
      orient: 'horizontal', // legend 横向布局。
    },
    series: [
      {
        name: '销售渠道',
        type: 'pie',
        radius: ['45%', '60%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '12',
            fontWeight: 'bold',
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
 * 依据主题类型获取颜色
 *
 * @export
 * @param {string} theme
 * @returns {any[]}
 */
export function getColorFromTheme(theme: string): any[] {
  const themeColor: any = getBrandColor(theme);
  const themeColorList: Array<any> = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const key in themeColor) {
    if (Object.prototype.hasOwnProperty.call(themeColor, key)) {
      const elementColor: any = themeColor[key];

      themeColorList.push(elementColor);
    }
  }

  return themeColorList;
}

/**
 * 更改图表主题颜色
 *
 * @export
 * @param {Array<any>} chartsList
 * @param {string} theme
 */
export function changeChartsTheme(chartsList: Array<any>, theme: string): void {
  if (chartsList && chartsList.length) {
    const chartChangeColor: Array<any> = getColorFromTheme(theme) || chartListColor;
    chartListColor = chartChangeColor;

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
