<template>
  <div class="app-container">
    <h1>dashboard-container</h1>
    <el-button type="primary" size="small" @click="go404Page">404</el-button>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const router = useRouter()

    const go404Page = () => {
      router.push({ name: 'NotFound' })
    }

    return {
      go404Page
    }
  }
})
</script>

<style scoped>
</style>
