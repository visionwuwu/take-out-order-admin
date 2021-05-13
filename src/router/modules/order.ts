import { AppRouteRecordRaw } from '../types'
const Layout = () => import('layouts/index.vue')

const OrderRoutes: Array<AppRouteRecordRaw> = [
  {
    path: '/orders',
    component: Layout,
    redirect: '/orders/list',
    meta: {
      title: '订单管理',
      icon: 'el-icon-s-order'
    },
    children: [
      {
        path: 'list',
        component: () => import('views/orders/list.vue'),
        meta: {
          title: '订单列表',
          icon: 'el-icon-s-order'
        }
      },
      {
        path: 'detail/:id(\\d+)',
        hidden: true,
        component: () => import('views/orders/components/detail.vue'),
        meta: {
          title: '订单详情',
          activeMenu: '/orders/list',
          noCache: true,
        }
      }
    ]
  }
]

export default OrderRoutes
