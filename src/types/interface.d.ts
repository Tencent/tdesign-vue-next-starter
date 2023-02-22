import type { RouteRecordName, LocationQueryRaw, RouteMeta } from 'vue-router';
import STYLE_CONFIG from '@/config/style';

export type ModeType = 'dark' | 'light';

export type SettingType = typeof STYLE_CONFIG;

export type ClassName = { [className: string]: any } | ClassName[] | string;

export type CommonObjType = {
  [key: string]: string | number;
};

export interface MenuRoute {
  path: string;
  title?: string;
  name?: string;
  icon?:
    | string
    | {
        render: () => void;
      };
  redirect?: string;
  children: MenuRoute[];
  meta: RouteMeta;
}

export interface NotificationItem {
  id: string;
  content: string;
  type: string;
  status: boolean;
  collected: boolean;
  date: string;
  quality: string;
}

export interface TRouterInfo {
  path: string;
  query?: LocationQueryRaw;
  routeIdx?: number;
  title?: string;
  name?: RouteRecordName | null;
  isAlive?: boolean;
  isHome?: boolean;
  meta?: RouteMeta;
}

export interface TTabRouterType {
  isRefreshing: boolean;
  tabRouterList: Array<TRouterInfo>;
}

export interface Proxy {
  isRequestProxy: boolean;
  [key: string]: ProxyItem | boolean;
}

export interface ProxyItem {
  host?: string;
  cdn?: string;
}
