import { Ref, onUnmounted, onMounted } from 'vue';
import * as echarts from 'echarts/core';

export const useChart = (domId: string, chart: Ref) => {
  let chartContainer: HTMLCanvasElement;
  const selfChart = chart;
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
};