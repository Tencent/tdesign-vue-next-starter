import { TChartColor } from '@/config/color';
import { getChartListColor } from '@/utils/color';
import { getRandomArray, getDateArray } from '@/utils/charts';

/** 平滑图数据 */
export function getSmoothLineDataSet({
  dateTime = [],
  placeholderColor,
  borderColor,
}: { dateTime?: Array<string> } & TChartColor) {
  let dateArray: Array<string> = ['00:00', '02:00', '04:00', '06:00'];
  if (dateTime.length > 0) {
    const divideNum = 7;
    dateArray = getDateArray(dateTime, divideNum);
  }

  return {
    color: getChartListColor(),
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
        color: placeholderColor,
      },
      axisLine: {
        lineStyle: {
          color: borderColor,
          width: 1,
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: placeholderColor,
      },
      splitLine: {
        lineStyle: {
          color: borderColor,
        },
      },
    },
    legend: {
      data: ['本月', '上月'],
      icon: 'circle',
      bottom: '0',
      itemGap: 48,
      itemHeight: 8,
      itemWidth: 8,
      textStyle: {
        fontSize: 12,
        color: placeholderColor,
      },
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
        color: getChartListColor()[0],
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        areaStyle: {
          normal: {
            opacity: 0.1,
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
        color: getChartListColor()[1],
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
export function get2ColBarChartDataSet({
  isMonth = false,
  placeholderColor,
  borderColor,
}: { isMonth?: boolean } & TChartColor) {
  let lastYearListCopy = lastYearList.concat([]);
  let thisYearListCopy = lastYearList.concat([]);

  if (isMonth) {
    lastYearListCopy = lastYearListCopy.reverse();
    thisYearListCopy = thisYearListCopy.reverse();
  }

  return {
    color: getChartListColor(),
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
          color: placeholderColor,
        },
        axisLine: {
          lineStyle: {
            color: borderColor,
            width: 1,
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          color: placeholderColor,
        },
        splitLine: {
          lineStyle: {
            color: borderColor,
          },
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
      textStyle: {
        fontSize: 12,
        color: placeholderColor,
      },
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
          color: (params: { value: number }) => {
            if (params.value >= 200) {
              return getChartListColor()[1];
            }
            return getChartListColor()[0];
          },
        },
      },
    ],
  };
}
