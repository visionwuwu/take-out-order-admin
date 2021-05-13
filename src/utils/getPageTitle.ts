import { RouteLocationNormalized } from 'vue-router'
import defaultConfig from '@/config/default/default'

export default function getPageTitle(to: RouteLocationNormalized): string {
  let title: string = defaultConfig.title
  if (to && to.meta && to.meta.title) {
    title += ' - ' + to.meta.title
  }
  return title
}