<template>
  <div v-if="!menuItem.hidden">
    <template
      v-if="
        hasOnlyOneChild(menuItem.children, menuItem) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !menuItem.alwaysShow
      "
    >
      <app-link :to="resolvePathCopy(onlyOneChild.path)">
        <el-menu-item :index="resolvePathCopy(onlyOneChild.path)">
          <template #title>
            <item
              :title="onlyOneChild.meta && onlyOneChild.meta.title"
              :icon="
                (onlyOneChild.meta && onlyOneChild.meta.icon) ||
                (menuItem.meta && menuItem.meta.icon)
              "
            ></item>
          </template>
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePathCopy(onlyOneChild.path)"
      popper-append-to-body
    >
      <template #title>
        <item
          v-if="menuItem.meta"
          :title="menuItem.meta.title && menuItem.meta.title"
          :icon="menuItem.meta && menuItem.meta.icon"
        />
      </template>
     <template v-if="menuItem.children">
      <sidebar-item
        v-for="child in menuItem.children"
        :key="child.path"
        :is-nest="true"
        :menuItem="child"
        :basePath="resolvePathCopy(child.path)"
      />
     </template>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { ref, PropType, defineComponent } from 'vue'
import { isExternal } from 'utils/validate'
import { AppRouteRecordRaw } from 'router/types'
import Item from './Item.vue'
import AppLink from './Link.vue'

export default defineComponent({
  name: 'SidebarItem',
  props: {
    // route Object
    menuItem: {
      type: Object as PropType<AppRouteRecordRaw>,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      required: true
    }
  },
  components: {
    Item,
    AppLink,
  },
  setup(props) {
    const onlyOneChild = ref()

    const hasOnlyOneChild = (children: any[] = [], parent?: any) => {
      if (!parent) return
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          onlyOneChild.value = item
          return true
        }
      })

      if (showingChildren.length === 1) {
        return true
      }

      if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    }

    const resolve = (...paths: any[]) => {
      const hasRootPath = paths.includes('/')
      paths = paths.filter((path) => path !== '/')
      return hasRootPath ? '/' + paths.join('/') : paths.join('/')
    }

    const resolvePathCopy = (routePath: string) => {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(props.basePath)) {
        return props.basePath
      }
      return resolve(props.basePath, routePath)
    }

    const resolvePath = (children: any[] = [], basePath: string, routePath: string[] = []) => {
      if (!hasOnlyOneChild(children)) {
        routePath.push(basePath)
      }

      if (children.length === 0) {
        routePath = [basePath]
      } else {
        routePath = children
          .reduce(
            (prev, curr) => {
              return prev.concat(curr.path)
            },
            [basePath]
          )
          .filter((path: string) => path !== '/')
      }

      return basePath === '/' ? basePath + routePath.join('/') : routePath.join('/')
    }

    return {
      onlyOneChild,
      hasOnlyOneChild,
      resolve,
      resolvePathCopy,
    }
  }
})
</script>

<style scoped>
</style>
