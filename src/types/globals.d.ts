// 通用声明

// Vue
declare module '*.vue' {
  import { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare type ClassName = { [className: string]: any } | ClassName[] | string;

declare interface ImportMeta {
  env: {
    MODE: 'mock' | 'development' | 'test' | 'release';
  };
  glob: (url: string) => { url };
}

declare module '*.svg' {
  const CONTENT: string;
  export default CONTENT;
}
