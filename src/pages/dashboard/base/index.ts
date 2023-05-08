import dayjs from 'dayjs';

import { TChartColor } from '@/config/color';
import { t } from '@/locales';
import { getRandomArray } from '@/utils/charts';
import { getChartListColor } from '@/utils/color';

/** 首页 dashboard 折线图 */
export function constructInitDashboardDataset(type: string) {
  const dateArray: Array<string> = [];
  for (let i = 1; i < 7; i++) {
    dateArray.push(t(`dashboard.base.chart.week${i}`));
  }
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
              { type: 'max', name: t('dashboard.base.chart.max') },
              { type: 'min', name: t('dashboard.base.chart.min') },
            ],
          },
          lineStyle: {
            width: 2,
          },
        },
      ],
    };
    return lineDataset;
  }
  const barDataset = {
    ...datasetAxis,
    color: getChartListColor(),
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
              opacity: 0.2,
            },
          },
          {
            value: 118,
            itemStyle: {
              opacity: 0.2,
            },
          },
          {
            value: 60,
            itemStyle: {
              opacity: 0.2,
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
export function constructInitDataset({
  dateTime = [],
  placeholderColor,
  borderColor,
}: { dateTime: Array<string> } & TChartColor) {
  const divideNum = 10;
  const timeArray = [];
  const inArray = [];
  const outArray = [];
  for (let i = 0; i < divideNum; i++) {
    if (dateTime.length > 0) {
      const dateAbsTime: number = (new Date(dateTime[1]).getTime() - new Date(dateTime[0]).getTime()) / divideNum;
      const enhandTime: number = new Date(dateTime[0]).getTime() + dateAbsTime * i;
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

  const dataset = {
    color: getChartListColor(),
    tooltip: {
      trigger: 'item',
    },
    xAxis: {
      type: 'category',
      data: timeArray,
      axisLabel: {
        color: placeholderColor,
      },
      axisLine: {
        lineStyle: {
          color: getChartListColor()[1],
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
        color: placeholderColor,
      },
      left: 'center',
      bottom: '0',
      orient: 'horizontal',
      data: [t('dashboard.base.topPanel.analysis.series1'), t('dashboard.base.topPanel.analysis.series2')],
    },
    series: [
      {
        name: t('dashboard.base.topPanel.analysis.series1'),
        data: outArray,
        type: 'bar',
      },
      {
        name: t('dashboard.base.topPanel.analysis.series2'),
        data: inArray,
        type: 'bar',
      },
    ],
  };

  return dataset;
}

/**
 *  线性图表数据源
 *
 * @export
 * @param {Array<string>} [dateTime=[]]
 * @returns {*}
 */
export function getLineChartDataSet({
  dateTime = [],
  placeholderColor,
  borderColor,
}: { dateTime?: Array<string> } & TChartColor) {
  const divideNum = 10;
  const timeArray = [];
  const inArray = [];
  const outArray = [];
  for (let i = 0; i < divideNum; i++) {
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
    color: getChartListColor(),
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
      data: [t('dashboard.base.topPanel.analysis.series1'), t('dashboard.base.topPanel.analysis.series2')],
      textStyle: {
        fontSize: 12,
        color: placeholderColor,
      },
    },
    xAxis: {
      type: 'category',
      data: timeArray,
      boundaryGap: false,
      axisLabel: {
        color: placeholderColor,
      },
      axisLine: {
        lineStyle: {
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
    series: [
      {
        name: t('dashboard.base.topPanel.analysis.series1'),
        data: outArray,
        type: 'line',
        smooth: false,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          borderColor,
          borderWidth: 1,
        },
        areaStyle: {
          opacity: 0.1,
        },
      },
      {
        name: t('dashboard.base.topPanel.analysis.series2'),
        data: inArray,
        type: 'line',
        smooth: false,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          borderColor,
          borderWidth: 1,
        },
      },
    ],
  };
  return dataSet;
}

/**
 * 获取饼图数据
 *
 * @export
 * @param {number} [radius=1]
 * @returns {*}
 */
export function getPieChartDataSet({
  radius = 42,
  textColor,
  placeholderColor,
  containerColor,
}: { radius?: number } & Record<string, string>) {
  return {
    color: getChartListColor(),
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
        color: placeholderColor,
      },
      left: 'center',
      bottom: '0',
      orient: 'horizontal', // legend 横向布局。
    },
    series: [
      {
        name: t('dashboard.base.topPanel.analysis.channels'),
        type: 'pie',
        radius: ['48%', '60%'],
        avoidLabelOverlap: true,
        selectedMode: true,
        silent: true,
        itemStyle: {
          borderColor: containerColor,
          borderWidth: 1,
        },
        label: {
          show: true,
          position: 'center',
          formatter: ['{value|{d}%}', `{name|{b}${t('dashboard.base.topPanel.analysis.channelTips')}}`].join('\n'),
          rich: {
            value: {
              color: textColor,
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
          scale: true,
          label: {
            show: true,
            formatter: ['{value|{d}%}', '{name|{b}渠道占比}'].join('\n'), // TODO 这个东西不知道怎么翻译
            rich: {
              value: {
                color: textColor,
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
          {
            value: 1048,
            name: t('dashboard.base.topPanel.analysis.channel1'),
          },
          { value: radius * 7, name: t('dashboard.base.topPanel.analysis.channel2') },
        ],
      },
    ],
  };
}
