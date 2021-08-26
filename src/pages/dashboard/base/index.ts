import dayjs from 'dayjs';

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
export function getRandomNum(num = 100): number {
  let resultNum = Number((Math.random() * num).toFixed(0));

  if (resultNum <= 1) {
    resultNum = 1;
  }

  return resultNum;
}

/** 柱状图数据源 */
export function constructInitDataset(dateTime: Array<string> = []) {
  const dataset: Array<Array<string>> = [['时间'], ['入库'], ['出库']];
  const divideNum = 10;

  for (let i = 0; i < divideNum; i++) {
    const [timeArray, inArray, outArray] = dataset;
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

    inArray.push(getRandomNum().toString());
    outArray.push(getRandomNum().toString());
  }
  return dataset;
}

/**
 *  线性图表数据源
 *
 * @export
 * @param {Array<string>} [dateTime=[]]
 * @returns {*}
 */
export function getLineChartDataSet(dateTime: Array<string> = []): any {
  if (dateTime.length > 0) {
    const devideNum = 10;
    const dateArray: Array<string> = getDateArray(dateTime, devideNum);
    return [
      dateArray,
      getSelftItemList('杯子', devideNum),
      getSelftItemList('茶叶', devideNum),
      getSelftItemList('蜂蜜', devideNum),
      getSelftItemList('面粉', devideNum),
    ];
  }
  return [
    [
      '日期',
      '2020-01-16',
      '2020-01-17',
      '2020-01-18',
      '2020-01-19',
      '2020-01-20',
      '2020-01-21',
      '2020-01-22',
      '2020-01-23',
      '2020-01-24',
      '2020-01-25',
    ],
    ['杯子', 5, 15, 15, 25, 24, 13, 32, 37, 43, 35],
    ['茶叶', 1, 6, 13, 38, 39, 44, 48, 75, 62, 52],
    ['蜂蜜', 16, 22, 27, 22, 32, 35, 23, 32, 33, 25],
    ['面粉', 12, 12, 25, 29, 21, 30, 37, 47, 40, 47],
  ];
}
/** 图表颜色 */
export const chartListColor: Array<string> = ['#0052D9', '#00A870', '#7D46BD', '#0594FA', '#ED7B2F'];

/**
 * 获取表头数据
 *
 * @export
 * @param {string[]} dateTime
 * @param {number} divideNum
 * @returns {string[]}
 */
export function getDateArray(dateTime: string[] = [], divideNum = 10): string[] {
  const timeArray: string[] = ['日期'];
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
 * 获取表行数据
 *
 * @export
 * @param {string} productName
 * @param {number} devideNum
 */
export function getSelftItemList(productName: string, devideNum: number): string[] {
  const productArray: string[] = [productName];
  for (let i = 0; i < devideNum; i++) {
    productArray.push(getRandomNum(100 * i).toString());
  }

  return productArray;
}

/**
 * 散点图数据
 *
 * @export
 * @returns {any[]}
 */
export function getScattlerDataSet(): any[] {
  const scatterData = [...Array(40)].map(() => [
    getRandomNum(Math.random() * 100),
    getRandomNum(Math.random() * 200),
    getRandomNum(Math.random() * 30),
    getRandomNum(Math.random() * 400),
  ]);

  return [
    ['咖啡机质量', '咖啡机效果', '按摩仪质量', '按摩仪效果'],
    [getRandomNum(100), getRandomNum(200), getRandomNum(100), getRandomNum(500)],
    ...scatterData,
  ];
}

/**
 * 获域图数据结构
 *
 * @export
 * @returns {any[]}
 */
export function getAreaChartDataSet(text = ''): any {
  return {
    title: {
      text,
    },
    dataset: [
      ['时间', '00:00', '02:00', '04:00', '06:00', '08:00'],
      [
        '测试',
        getRandomNum(Math.random() * 100),
        getRandomNum(Math.random() * 200),
        getRandomNum(Math.random() * 300),
        getRandomNum(Math.random() * 400),
        getRandomNum(Math.random() * 500),
      ],
      [
        '上线',
        getRandomNum(Math.random() * 100),
        getRandomNum(Math.random() * 200),
        getRandomNum(Math.random() * 300),
        getRandomNum(Math.random() * 400),
        getRandomNum(Math.random() * 500),
      ],
    ],
    area: {
      smooth: true,
    },
    injectOption: (option) => ({ ...option, color: chartListColor }),
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
      title: {
        text: '',
      },
      dataset: [
        ['日期', '1', '4', '8', '12', '16', '20', '24'],
        [
          '告警',
          getRandomNum(Math.random() * 800),
          getRandomNum(Math.random() * 700),
          getRandomNum(Math.random() * 600),
          getRandomNum(Math.random() * 500),
          getRandomNum(Math.random() * 400),
          getRandomNum(Math.random() * 300),
          getRandomNum(Math.random() * 100),
        ],
      ],
      injectOption: (option) => ({ ...option, color: chartListColor }),
    };
  }
  return {
    title: {
      text: '',
    },
    dataset: [
      ['时间', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      [
        '告警',
        getRandomNum(Math.random() * 200),
        getRandomNum(Math.random() * 300),
        getRandomNum(Math.random() * 600),
        getRandomNum(Math.random() * 500),
        getRandomNum(Math.random() * 100),
        getRandomNum(Math.random() * 300),
        getRandomNum(Math.random() * 100),
      ],
    ],
    injectOption: (option) => ({ ...option, color: chartListColor }),
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
    title: {
      text: '',
    },
    dataset: [
      ['状态', '审核中', '待履行', '履行中', '已完成'],
      ['数量', 67, 45, radius, 36],
    ],
    injectOption: (option) => ({ ...option, color: chartListColor }),
    pie: {
      radius: ['45%', '60%'], // 设置内圆和外圆半径
    },
  };
}
