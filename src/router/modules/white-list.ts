import { AppRouteRecordRaw } from "../types";
const Layout = () => import('layouts/index.vue')

const NotFound = () => import('views/error/404.vue')

const WhiteListRoutes: Array<AppRouteRecordRaw> = [
  {
    path: '/',
    name: 'layouts',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: 'el-icon-location'
        },
        component: () => import('views/dashboard/index.vue')
      }
    ]
  },
  {
    path: '/documentation',
    redirect: '/documentation/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Documentation',
        meta: {
          title: '文档',
          icon: 'el-icon-document'
        },
        component: () => import('views/documentation/index.vue')
      }
    ]
  },
  {
    path: '/error',
    name: 'Error',
    hidden: true,
    component: Layout,
    children: [
      {
        path: '404',
        name: 'NotFound',
        component: NotFound,
        hidden: true,
        meta: {
          title: 'NotFound',
        }
      }
    ] 
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    hidden: true,
    redirect: '/error/404'
  }
]

export default WhiteListRoutes;