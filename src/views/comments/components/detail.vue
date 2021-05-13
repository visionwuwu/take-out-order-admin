<template>
  <div class="app-container">
    <el-card shadow="always" :body-style="{ padding: '20px' }" style="margin-bottom: 15px">
      <el-page-header
        @back="$router.go(-1)"
        :content="isEdit ? '更新评论' : '新建评论'"
      ></el-page-header>
    </el-card>

    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <el-form :model="model" label-position="top">
        <el-form-item label="商家回复" prop="shopReplyContent">
          <el-input
            v-model="model.shopReplyContent"
            rows="5"
            type="textarea"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="评论内容" prop="content">
          <el-input
            v-model="model.content"
            rows="5"
            type="textarea"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="用户评论图片" prop="images">
          <div>
            <el-row :gutter="10" v-if="!!model.images">
            <el-col :span="3" v-for="image in images" :key="image">
              <el-image
                :src="image"
                :preview-src-list="[image]"
                fit="cover"
              >
              </el-image>
            </el-col>
          </el-row>
          <el-empty v-else description="此用户没有上传图片" :image-size="100"></el-empty>
          </div>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" @click="submitForm">发表</el-button> -->
          <!-- <el-button @click="resetForm">重置</el-button> -->
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, toRefs, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { useItem } from '../models/commentModel'

export default defineComponent({
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const form = ref()
    const route = useRoute()
    const router = useRouter()
    const id = parseInt(route.params.id as string)
    const { model, updateItem, createItem } = useItem(props.isEdit, id)

    // 定义响应式数据
    const data = reactive({
      // 格式化评论图片
      images: computed<string[]>(() => {
        return model.value.images ? model.value.images.split(',') : []
      })
    })

    // 定义方法
    const methods = reactive({
      resetForm: () => {
        form.value.resetFields()
      },
      submitForm: () => {
        form.value.validate(async (valid: any) => {
          // 校验成功
          if (valid) {
            if (props.isEdit) {
              // 更新item
              await updateItem(id, model.value)
              // 操作成功提示
              ElMessage({
                message: '更新成功',
                type: 'success',
                duration: 1000,
                onClose() {
                  router.push('/kinds/list')
                }
              })
            } else {
              // 创建item
              await createItem(model.value)
              // 操作成功提示
              ElMessage({
                message: '创建成功',
                type: 'success',
                duration: 1000,
                onClose() {
                  router.push('/kinds/list')
                }
              })
            }
          }
        })
      }
    })

    return {
      model,
      form,
      ...toRefs(data),
      ...toRefs(methods)
    }
  }
})
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
