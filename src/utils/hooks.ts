import { ref, Ref, onUnmounted, onMounted } from 'vue';
import * as echarts from 'echarts/core';

/**
 * eChart hook
 * @param domId 
 * @param chart 
 */
export const useChart = (domId: string) => {
  let chartContainer: HTMLCanvasElement;
  const selfChart = ref<echarts.ECharts>();
  const updateContainer = () => {
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

  return selfChart
};

/**
 * counter utils
 * @param duration 
 * @returns 
 */
export const useCounter = (duration: number = 60): [
  Ref<number>, () => void
] => {
  let intervalTimer = null;
  onMounted(() => {
    clearInterval(intervalTimer)
  })
  const countDown = ref(0);

  return [countDown, () => {
    countDown.value = duration;
    intervalTimer = setInterval(() => {
      if (countDown.value > 0) {
        countDown.value -= 1;
      } else {
        clearInterval(intervalTimer);
        countDown.value = 0;
        intervalTimer = null;
      }
    }, 1000)
  }];
}