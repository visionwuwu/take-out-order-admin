import router from 'router/index'
import { useAppStore } from './store'
import NProgress from 'nprogress'
import whiteList from './config/default/whiteList'
import { ElMessage } from 'element-plus'
import 'nprogress/nprogress.css'
import { UserActionTypes } from './store/modules/user/action-types'
import getPageTitle from './utils/getPageTitle'

NProgress.configure({ showSpinner: false })

/** 全局前置守卫 */
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const store = useAppStore()
  if (store.state.user.token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (!store.state.user.username) {
        try {
          await store.dispatch(UserActionTypes.ACTION_GET_USER_INFO)

          next({ ...to, replace: true })
        } catch (err) {
          store.dispatch(UserActionTypes.ACTION_RESET_TOKEN, undefined)
          ElMessage.error(err || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
        next()
      }
    }
  } else {
    // token不存在
    if (whiteList.indexOf(to.path) !== -1) {
      // 访问的路由路径在白名单列表，直接跳过
      next()
    } else {
      // 其他没有访问权限的页面将重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

/** 全局后置钩子 */
router.afterEach((to, from, failure) => {
  NProgress.done()
  document.title = getPageTitle(to)
})
