import 'vue-router';
import { shallowRef } from 'vue';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    icon?:
      | string
      | {
          render: () => void;
        }
      | shallowRef;
    expanded?: boolean;
    orderNo?: number;
    hidden?: boolean;
    hiddenBreadcrumb?: boolean;
    single?: boolean;
    frameSrc?: string;
    frameBlank?: boolean;
  }
}

export interface BreadcrumbItem {
  path: string;
  to: string;
  title: string;
}
