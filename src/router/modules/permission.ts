import { AppRouteRecordRaw } from "../types"
const Layout = () => import('layouts/index.vue')

const PermissionRoutes: Array<AppRouteRecordRaw> = [
  {
    path: '/permission',
    redirect: '/permission/page',
    component: Layout,
    meta: {
      title: '权限测试页',
      icon: 'el-icon-setting'
    },
    children: [
      {
        path: 'page',
        name: 'PermissionPage',
        meta: {
          title: '页面权限'
        },
        component: () => import('views/permission/page.vue')
      },
      {
        path: 'directive',
        name: 'PermissionDirective',
        meta: {
          title: '指令权限'
        },
        component: () => import('views/permission/directive.vue')
      },
      {
        path: 'role',
        name: 'PermissionRole',
        meta: {
          title: '角色权限',
          noCache: true
        },
        component: () => import('views/permission/role.vue')
      }
    ]
  },
]

export default PermissionRoutes;