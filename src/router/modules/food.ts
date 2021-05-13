import { AppRouteRecordRaw } from 'router/types'
const Layout = () => import('layouts/index.vue')

const FoodRoutes: Array<AppRouteRecordRaw> = [
  {
    path: '/foods',
    redirect: '/foods/list',
    component: Layout,
    meta: {
      title: '菜品管理',
      icon: 'el-icon-dish'
    },
    children: [
      {
        path: 'list',
        name: 'FoodList',
        component: () => import('views/foods/list.vue'),
        meta: {
          title: '菜品列表',
          icon: 'el-icon-food'
        }
      },
      {
        path: 'create',
        component: () => import('views/foods/create.vue'),
        hidden: true,
        meta: {
          title: '创建菜品',
          activeMenu: '/foods/list',
          noCache: true
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('views/foods/edit.vue'),
        hidden: true,
        meta: {
          title: '编辑菜品',
          activeMenu: '/foods/list',
          noCache: true
        }
      }
    ]
  }
]

export default FoodRoutes