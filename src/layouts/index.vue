<template>
  <div class="app-wrapper">
    <!-- 侧边栏 -->
    <sidebar class="app-sidebar"></sidebar>
    <!-- 左侧区域 -->
    <div class="app-main-container">
      <!-- 顶部导航栏 -->
      <navbar />
      <!-- 应用主内容 -->
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Sidebar from 'layouts/components/Sidebar/index.vue';
import Navbar from 'layouts/components/Navbar.vue';
import AppMain from 'layouts/components/AppMain.vue';

export default defineComponent({
  name: 'layouts',
  components: {
    Sidebar,
    Navbar,
    AppMain
  }
})

</script>

<style lang="scss" scoped>
@import 'styles/_variables.module.scss';
.app-wrapper {
  // overflow: hidden;
  .app-sidebar {
    position: fixed;
    left: 0;
    top: 0;
    width: $sideBarWidth;
    height: 100%;
    background-color: $menuBackgroundColor;
  }

  .app-main-container {
    margin-left: $sideBarWidth;
  }

  .app-navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    width: 100%;
    padding: 0 15px;
    background-color: #ffffff;
    box-shadow: 0 3px rgba(0, 0, 0, 0.03);
  }

  .app-main {
    /*50 = navbar */
    min-height: calc(100vh - 50px);
    width: 100%;
    // padding: 32px;
    position: relative;
    overflow: hidden;
  }
}
</style>
