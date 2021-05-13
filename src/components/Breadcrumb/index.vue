<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <router-link
          v-if="item.redirect !== 'noRedirect' && index !== levelList.length - 1"
          :to="item.path"
          >{{ item.title }}</router-link
        >
        <span v-else>{{ item.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    function filterMatched(matched: any[]) {
      matched = matched.reduce((prev, curr) => {
        if (curr.meta && curr.meta.title && curr.meta.breadcrumb !== false) {
          const breadcrumb = {
            title: curr.meta.title,
            path: curr.path,
            redirect: curr.redirect
          }
          prev = prev.concat(breadcrumb)
        }
        return prev
      }, [])
    
      if ((matched.slice(0, 1) as any).path !== '/') {
        const home = { title: '首页', path: '/' }
        matched = [home].concat(matched)
      }

      return matched
    }

    const levelList = computed(() => {
      const route = useRoute()
      const { matched } = route
      return filterMatched(matched)
    })

    return {
      levelList
    }
  }
})
</script>

<style scoped>
.app-breadcrumb {
  margin-left: 0.6rem;
}
</style>
