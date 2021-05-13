import { AppRouteRecordRaw } from '../types'
const Layout = () => import('layouts/index.vue')

const AccountRoutes: Array<AppRouteRecordRaw> = [
  {
    path: '/account',
    component: Layout,
    redirect: '/account/setting',
    meta: {
      title: '个人页',
      icon: 'el-icon-edit-outline'
    },
    children: [
      {
        path: 'list',
        component: () => import('views/account/setting.vue'),
        meta: {
          title: '个人设置',
          icon: 'el-icon-edit-outline'
        }
      },
    ]
  }
]

export default AccountRoutes
