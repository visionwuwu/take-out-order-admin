import { createApp, Directive } from 'vue'
import router from 'router/index'
import store from 'store/index'
import ElementPlus from 'plugins/element-plus'
import App from './App.vue'
import '@/permission'
import * as directives from '@/directives'
import 'styles/index.scss'

console.log('directives', directives)

const app = createApp(App)

app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 }

// 注册全局自定义指令
Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string ]: Directive })[key] as any)
})

app
.use(router)
.use(store)
.use(ElementPlus)
.mount('#app')
