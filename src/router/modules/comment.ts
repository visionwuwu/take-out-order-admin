import { AppRouteRecordRaw } from 'router/types'
const Layout = () => import('layouts/index.vue')

const CommentRoutes: Array<AppRouteRecordRaw> = [
  {
    path: '/comments',
    redirect: '/comments/list',
    component: Layout,
    meta: {
      title: '评论管理',
      icon: 'el-icon-s-comment'
    },
    children: [
      {
        path: 'list',
        name: 'BannerList',
        component: () => import('views/comments/list.vue'),
        meta: {
          title: '评论列表',
          icon: 'el-icon-s-comment'
        }
      },
      {
        path: 'create',
        component: () => import('views/comments/create.vue'),
        hidden: true,
        meta: {
          title: '创建评论',
          activeMenu: '/comments/list',
          noCache: true,
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('views/comments/edit.vue'),
        hidden: true,
        meta: {
          title: '修改评论',
          activeMenu: '/comments/list',
          noCache: true,
        }
      },
      {
        path: 'reply/:id(\\d+)',
        component: () => import('views/comments/reply.vue'),
        hidden: true,
        meta: {
          title: '商家回复',
          activeMenu: '/comments/list',
          noCache: true,
        }
      }
    ]
  }
]

export default CommentRoutes