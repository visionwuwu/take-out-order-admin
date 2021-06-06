/*
 * @Description:
 * @Author: Visionwuwu
 * @Date: 2021-05-09
 * @LastEditors: Visionwuwu
 * @LastEditTime: 2021-05-09
 */
import {ElMessage, ElLoading} from 'element-plus'
import { ElMessageBoxShortcutMethod } from 'element-plus/lib/el-message-box/src/message-box.type';
import 'vue-router'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: typeof ElMessage,
    $confirm: ElMessageBoxShortcutMethod,
    $loading: typeof ElLoading.service,
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    roles?: string[];
    title?: string;
    icon?: string;
    noCache?: boolean;
    breadcrumb?: boolean;
    activeMenu?: string;
  }
}
