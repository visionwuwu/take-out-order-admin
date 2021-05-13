import { AppRouteRecordRaw } from 'router/types'
const Layout = () => import('layouts/index.vue')

const BannerRoutes: AppRouteRecordRaw[] = [
  {
    path: '/banners',
    redirect: '/banners/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'Banner',
        component: () => import('views/banners/list.vue'),
        meta: {
          title: '轮播图列表',
          icon: 'el-icon-picture'
        }
      },
      {
        path: 'create',
        component: () => import('views/banners/create.vue'),
        hidden: true,
        meta: {
          title: '创建轮播图',
          activeMenu: '/banners/list',
          noCache: true
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('views/banners/edit.vue'),
        hidden: true,
        meta: {
          title: '编辑轮播图信息',
          activeMenu: '/banners/list',
          noCache: true
        }
      }
    ],
  }
]

export default BannerRoutes