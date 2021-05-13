import { AppRouteRecordRaw } from '../types'
const Layout = () => import('layouts/index.vue')

const UserRoutes: Array<AppRouteRecordRaw> = [
  {
    path: '/users',
    component: Layout,
    redirect: '/users/list',
    meta: {
      title: '用户管理',
      icon: 'el-icon-user-solid'
    },
    children: [
      {
        path: 'list',
        component: () => import('views/users/list.vue'),
        meta: {
          title: '用户列表',
          icon: 'el-icon-user-solid'
        }
      },
      {
        path: 'create',
        component: () => import('views/users/create.vue'),
        hidden: true,
        meta: {
          title: '创建新用户',
          activeMenu: '/users/list',
          noCache: true
        }
      },
      {
        path: 'edit/:id(\\d+)',
        name: 'userEdit',
        component: () => import('views/users/edit.vue'),
        hidden: true,
        meta: {
          title: '编辑用户信息',
          activeMenu: '/users/list',
          noCache: true
        }
      }
    ]
  }
]

export default UserRoutes
