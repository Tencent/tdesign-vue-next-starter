import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AxiosError } from 'axios';
import type { RequestOptions, Result } from '@/types/axios';

// 创建Axios选项
export interface CreateAxiosOptions extends AxiosRequestConfig {
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
  authenticationScheme?: string;
  // 数据处理
  transform?: AxiosTransform;
  // 请求选项
  requestOptions?: RequestOptions;
}

// Axios 数据处理
export abstract class AxiosTransform {
  // 请求前Hook
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

  // 转换前Hook
  transformRequestHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any;

  // 请求失败处理
  requestCatchHook?: (e: Error | AxiosError, options: RequestOptions) => Promise<any>;

  // 请求前的拦截器
  requestInterceptors?: (config: AxiosRequestConfig, options: CreateAxiosOptions) => AxiosRequestConfig;

  // 请求后的拦截器
  responseInterceptors?: (res: AxiosResponse) => AxiosResponse;

  // 请求前的拦截器错误处理
  requestInterceptorsCatch?: (error: AxiosError) => void;

  // 请求后的拦截器错误处理
  responseInterceptorsCatch?: (error: AxiosError) => void;
}
