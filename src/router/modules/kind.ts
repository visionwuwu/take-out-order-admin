import { AppRouteRecordRaw } from 'router/types'
const Layout = () => import('layouts/index.vue')

const KindRoutes: Array<AppRouteRecordRaw> = [
  {
    path: '/kinds',
    redirect: '/kinds/list',
    component: Layout,
    meta: {
      title: '菜品种类管理',
      icon: 'el-icon-menu'
    },
    children: [
      {
        path: 'list',
        name: 'KindList',
        component: () => import('views/kinds/list.vue'),
        meta: {
          title: '菜品种类列表',
          icon: 'el-icon-menu'
        }
      },
      {
        path: 'create',
        component: () => import('views/kinds/create.vue'),
        hidden: true,
        meta: {
          title: '创建菜品种类',
          activeMenu: '/kinds/list',
          noCache: true,
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('views/kinds/edit.vue'),
        hidden: true,
        meta: {
          title: '修改菜品种类',
          activeMenu: '/kinds/list',
          noCache: true,
        }
      }
    ]
  }
]

export default KindRoutes