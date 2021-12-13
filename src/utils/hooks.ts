import { ref, Ref, onUnmounted, onMounted } from 'vue';
import * as echarts from 'echarts/core';

/**
 * eChart hook
 * @param domId
 * @param chart
 */
export const useChart = (domId: string): Ref<echarts.ECharts> => {
  let chartContainer: HTMLCanvasElement;
  const selfChart = ref<echarts.ECharts | any>();
  const updateContainer = () => {
    // TODO resize 报错，响应式的问题，待处理
    selfChart.value.resize({
      width: chartContainer.clientWidth,
      height: chartContainer.clientHeight,
    });
  };

  onMounted(() => {
    if (!chartContainer) {
      chartContainer = document.getElementById(domId) as HTMLCanvasElement;
    }
    selfChart.value = echarts.init(chartContainer);
  });

  window.addEventListener('resize', updateContainer, false);

  onUnmounted(() => {
    window.removeEventListener('resize', updateContainer);
  });

  return selfChart;
};

/**
 * counter utils
 * @param duration
 * @returns
 */
export const useCounter = (duration = 60): [Ref<number>, () => void] => {
  let intervalTimer;
  onUnmounted(() => {
    clearInterval(intervalTimer);
  });
  const countDown = ref(0);

  return [
    countDown,
    () => {
      countDown.value = duration;
      intervalTimer = setInterval(() => {
        if (countDown.value > 0) {
          countDown.value -= 1;
        } else {
          clearInterval(intervalTimer);
          countDown.value = 0;
        }
      }, 1000);
    },
  ];
};
