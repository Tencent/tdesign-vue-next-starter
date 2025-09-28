import 'vue-router';

export {};
declare module 'vue-router' {
  interface RouteMeta {
    title?: string | Record<string, string>;
    icon?: string;
    expanded?: boolean;
    orderNo?: number;
    hidden?: boolean;
    hiddenBreadcrumb?: boolean;
    single?: boolean;
    keepAlive?: boolean;
    frameSrc?: string;
    frameBlank?: boolean;
    // roleCode?: string; // 前端 roles 控制菜单权限
  }
}
