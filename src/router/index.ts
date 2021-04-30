import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const Home = () => import('views/home/index.vue')
const Vuex = () => import('views/vuex/index.vue')
const NotFound = () => import('views/error/404.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'Home'
  },
  {
    name: 'Home',
    path: '/home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    name: 'Vuex',
    path: '/vuex',
    component: Vuex,
    meta: {
      title: 'Vuex页面'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
