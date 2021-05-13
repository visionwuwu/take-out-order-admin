<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :background-color="variables.menuBackgroundColor"
      :text-color="variables.menuTextColor"
      :active-text-color="variables.menuActiveTextColor"
      :default-active="activeItem"
      :unique-opened="false"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :menuItem="route"
        :basePath="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import variables from 'styles/_variables.module.scss'
import SidebarItem from './SidebarItem.vue'
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { routes } from 'router/index'

export default defineComponent({
  name: 'Sidebar',
  components: {
    SidebarItem,
  },
  setup() {
    const activeItem = computed(() => {
      const route = useRoute()
      const { meta, path } = route
      if (meta && meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })
    return {
      activeItem,
      routes,
      variables,
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
