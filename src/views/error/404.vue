<template>
  <div class="page-404-container">
    <el-result title="404" subTitle="抱歉，您访问的页面不存在">
      <template #icon>
        <el-image :style="style" fit="contain" :src="notFoundImg" alt="404"></el-image>
      </template>
      <template #extra>
        <el-button type="primary" size="medium" @click="goBack">返回</el-button>
      </template>
    </el-result>
  </div>
</template>

<script lang="ts">
import { CSSProperties, defineComponent, ref } from 'vue'
import notFoundImg from 'assets/images/404.png'

/** data选项接口定义 */
interface DataProps {
  /** 返回的完整路径 */
  backFullPath: string
}

export default defineComponent({
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const $data = vm.$data as DataProps;
      $data.backFullPath = from.fullPath;
    });
  },
  data() {
    return {
      backFullPath: ''
    }
  },
  methods: {
    goBack() {
      let backFullPath = this.backFullPath
      if (!backFullPath) {
        backFullPath = '/'
      }
      this.$router.push({
        path: backFullPath
      })
    }
  },
  setup() {
    const style: CSSProperties = {
      width: '500px',
      marginTop: '50px'
    }

    return {
      style,
      notFoundImg,
    }
  }
})
</script>

<style scoped>
</style>