import { RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

/**
 * 路由元信息
 */
export interface RouteMeta {
  roles?: string[];
  title?: string;
  icon?: string;
  noCache?: boolean;
  breadcrumb?: boolean;
  activeMenu?: string;
}


/**
 * 应用路由记录
 */
// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name?: string;
  meta?: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: any;
  fullPath?: string;
  hidden?: boolean;
  alwaysShow?: boolean;
}