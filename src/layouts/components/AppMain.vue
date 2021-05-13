<template>
  <section class="app-main">
    <!-- 内部应该显示子路由页面 -->
    <router-view v-slot="{ Component }">
      <transition name="fade-transform">
        <keep-alive v-if="route.meta && !route.meta.noCache">
          <component :is="Component"></component>
        </keep-alive>
        <component v-else :is="Component"></component>
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'AppMain',
  setup() {
    const route = useRoute()
    
    return {
      route
    }
  }
})


</script>