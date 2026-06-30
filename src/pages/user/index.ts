import type { TChartColor } from '@/config/color';
import { t } from '@/locales';
import { getDateArray, getRandomArray } from '@/utils/charts';
import { getChartListColor } from '@/utils/color';

/** 折线图数据 */
export function getFolderLineDataSet({
  dateTime = [],
  placeholderColor,
  borderColor,
}: { dateTime?: Array<string> } & TChartColor) {
  let dateArray: Array<string> = [
    t('pages.dashboardBase.chart.week1'),
    t('pages.dashboardBase.chart.week2'),
    t('pages.dashboardBase.chart.week3'),
    t('pages.dashboardBase.chart.week4'),
    t('pages.dashboardBase.chart.week5'),
    t('pages.dashboardBase.chart.week6'),
    t('pages.dashboardBase.chart.week7'),
  ];
  if (dateTime.length > 0) {
    const divideNum = 7;
    dateArray = getDateArray(dateTime, divideNum);
  }
  return {
    color: getChartListColor(),
    grid: {
      top: '5%',
      right: '10px',
      left: '30px',
      bottom: '60px',
    },
    legend: {
      left: 'center',
      bottom: '0',
      orient: 'horizontal', // legend 横向布局。
      data: [
        t('pages.dashboardDetail.procurement.goods.cup'),
        t('pages.dashboardDetail.procurement.goods.tea'),
        t('pages.dashboardDetail.procurement.goods.honey'),
        t('pages.dashboardDetail.procurement.goods.flour'),
      ],
      textStyle: {
        fontSize: 12,
        color: placeholderColor,
      },
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
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        name: t('pages.dashboardDetail.procurement.goods.cup'),
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
          borderColor,
          borderWidth: 1,
        },
      },
      {
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        name: t('pages.dashboardDetail.procurement.goods.tea'),
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
          borderColor,
          borderWidth: 1,
        },
      },
      {
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        name: t('pages.dashboardDetail.procurement.goods.honey'),
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
          borderColor,
          borderWidth: 1,
        },
      },
      {
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        name: t('pages.dashboardDetail.procurement.goods.flour'),
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
          borderColor,
          borderWidth: 1,
        },
      },
    ],
  };
}
