// 通用声明
declare type ClassName = { [className: string]: any } | ClassName[] | string;

declare interface ImportMeta {
  env: {
    MODE: 'mock' | 'development' | 'test' | 'release';
  };
  glob: (url: string) => {};
}

declare module '*.svg' {
  const CONTENT: string;
  export default CONTENT;
}
