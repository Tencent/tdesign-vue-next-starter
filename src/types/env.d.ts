/// <reference types="vite/client" />

// tips: dotenv只会把变量解析为字符串，因此使用过程中需要注意类型转换
interface ImportMetaEnv {
  /**
   * 项目标题
   * @example TDesign Vue Next Starter
   */
  readonly VITE_BASE_TITLE: string;
  /**
   * 项目命名空间
   *
   * 用于隔离不同项目的样式或配置
   * @example tdesign-starter
   */
  readonly VITE_BASE_NAMESPACE: string;
  /**
   * 运行端口
   * @default 3000
   */
  readonly VITE_BASE_PORT: string;
  /**
   * 打包路径
   *
   * 非必要不建议修改
   * @default /
   */
  readonly VITE_BASE_URL: string;

  /**
   * 是否使用请求库代理
   *
   * 如果启用会跳过Vite自带代理
   * @default true
   */
  readonly VITE_USE_REQUEST_PROXY: string;
  /**
   * 是否使用Vite Mock
   *
   * 使用请求库代理时失效
   * @default false
   */
  readonly VITE_USE_MOCK: string;
  /**
   * 请求的接口地址
   * @example http://127.0.0.1:3000
   */
  readonly VITE_API_URL: string;
  /**
   * 请求的接口前缀
   * @example /api
   */
  readonly VITE_API_URL_PREFIX: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
