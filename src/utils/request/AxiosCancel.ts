import type { AxiosRequestConfig, Canceler } from 'axios';
import axios from 'axios';
import isFunction from 'lodash/isFunction';

// 存储请求与取消令牌的键值对列表
let pendingMap = new Map<string, Canceler>();

export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&');

export class AxiosCanceler {
  // 添加请求到列表
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // 如果当前没有相同请求就添加
          pendingMap.set(url, cancel);
        }
      });
  }

  // 清空所有请求
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      if (cancel && isFunction(cancel)) cancel();
    });
    pendingMap.clear();
  }

  // 移除某个请求
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);

    if (pendingMap.has(url)) {
      // If there is a current request identifier in pending,
      // the current request needs to be cancelled and removed
      const cancel = pendingMap.get(url);
      if (cancel) cancel(url);
      pendingMap.delete(url);
    }
  }

  reset() {
    pendingMap = new Map<string, Canceler>();
  }
}
