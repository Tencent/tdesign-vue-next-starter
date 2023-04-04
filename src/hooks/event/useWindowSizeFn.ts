import debounce from 'lodash/debounce';
import { onMounted, onUnmounted } from 'vue';

interface WindowSizeOptions {
  immediate?: boolean;
}

interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

export function useWindowSizeFn<T>(fn: Fn<T>, options?: WindowSizeOptions, wait = 150) {
  const handleSize: () => void = debounce(fn, wait);

  const start = () => {
    if (options && options.immediate) {
      fn();
    }
    window.addEventListener('resize', handleSize);
  };

  const stop = () => {
    window.removeEventListener('resize', handleSize);
  };

  onMounted(() => {
    start();
  });

  onUnmounted(() => {
    stop();
  });
  return [start, stop];
}
