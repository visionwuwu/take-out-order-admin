<template>
  <div class="app-container">
    <el-card shadow="always" :body-style="{ padding: '20px' }" style="margin-bottom: 15px">
      <el-page-header
        @back="$router.go(-1)"
        content="商家回复"
      ></el-page-header>
    </el-card>

    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <el-form :model="model" ref="form">
        <el-form-item label="商家回复" prop="shopReplyContent">
          <el-input
            v-model="model.shopReplyContent"
            placeholder="请输入商家回复消息"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">确认</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { reqShopReply } from '@/apis/comment/comment'
import { ElMessage } from 'element-plus'
import { defineComponent, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const route = useRoute()
    const router = useRouter()
    const id = parseInt(route.params.id as string)
    // 定义数据
    const data = reactive({
      model: {
        shopReplyContent: ''
      }
    })

    // 定义方法
    const methods = reactive({
      submitForm: () => {
        reqShopReply(id, data.model.shopReplyContent).then(() => {
          ElMessage.success('回复成功')
          router.push('/comments/list')
        })
      }
    })

    return {
      ...toRefs(data),
      ...toRefs(methods)
    }
  }
})
</script>