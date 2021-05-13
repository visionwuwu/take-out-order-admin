import { createRouter, createWebHashHistory } from 'vue-router'
import { AppRouteRecordRaw } from './types'
import PermissionRoutes from './modules/permission'
import WhiteListRoutes from './modules/white-list'
import UserRoutes from './modules/user'
import BannerRoutes from './modules/banner'
import KindRoutes from './modules/kind'
import FoodRoutes from './modules/food'
import OrderRoutes from './modules/order'
import CommentRoutes from './modules/comment'
import AccountRoutes from './modules/account'

/**
 * 路由配置参数作用：
 * hidden: 如果设置为true，则侧边栏不显示当前路由，默认值为false
 * alwaysShow: 如果设置true，则总是显示为根菜单
 * name: 路由名称
 * redirect: noRedirect 如果设置为noRedirect则不跳转在面包屑导航
 * 
 * meta: {
 *  roles: ['admin', 'editor'] 页面可访问的权限
 *  title: 'title' 页面标题，侧边栏title，面包屑导航名称
 *  icon: 'el-icon-' element ui icon
 *  noCache: true 如果设置为true则页面不会缓存，默认为false缓存页面
 *  breadcrumb: false 如果设置为true则不会在breadcrumd显示，默认为true
 *  activeMenu: 如果设置一个path，sidebar将会在高亮匹配项
 * }
 */

// 路由配置项数组
export const routes: Array<AppRouteRecordRaw> = [
  ...WhiteListRoutes,
  ...PermissionRoutes,
  ...UserRoutes,
  ...BannerRoutes,
  ...KindRoutes,
  ...FoodRoutes,
  ...OrderRoutes,
  ...CommentRoutes,
  ...AccountRoutes,
]

// 用工厂函数创建router实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as any
})

// 重置路由
export const resetRouter = () => {
  const newRouter = router;
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
