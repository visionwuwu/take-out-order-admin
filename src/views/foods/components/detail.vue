<template>
  <div class="app-container">
    <el-card shadow="always" :body-style="{ padding: '20px' }" style="margin-bottom: 15px">
      <el-page-header
        @back="$router.go(-1)"
        :content="isEdit ? '更新菜品' : '新建菜品'"
      ></el-page-header>
    </el-card>

    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <el-form :model="model" :rules="rules" ref="form" label-position="top">
        <el-form-item label="菜品" prop="name">
          <el-input v-model="model.name" placeholder="请输入菜品名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number
            v-model="model.price"
            :min="0"
            :precision="2"
          >
          </el-input-number>
        </el-form-item>
        <el-form-item label="菜品所属分类">
        <el-select v-model="kindId" placeholder="请选择菜品所属分类" clearable>
          <el-option
            v-for="item in kindOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="图片" prop="image">
          <el-upload
            class="avatar-uploader"
            :action="actions"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="model.image" :src="model.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">{{ isEdit ? '更新' : '创建' }}</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, toRefs, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { useItem } from '../models/foodModel'
import defaultConfig from '@/config/default/default'
import { getToken } from '@/utils/cookies'
import { AxiosResultData } from '@/utils/request'
import { ApiStatusCode } from '@/common/enums/ApiStatusCode.enum'

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
    const { model, updateItem, createItem, kindOptions } = useItem(props.isEdit, id)

    /** 格式化菜品总类id */
    const kindId = computed<number>({
      get() {
        return computed(() => model.value.kind!.id as number).value
      },
      set(value) {
        model.value.kind!.id = value
      },
    })

    // 定义响应式数据
    const data = reactive({
      rules: {
        image: [{ required: true, message: '请上传图片', trigger: 'blur' }],
        name: [{ required: true, message: '请输入菜品名称', trigger: 'blur' }]
      },
      actions: defaultConfig.apiBaseUrl + '/files/single',
      headers: {
        Authorization: import.meta.env.VITE_BASE_BEARER + ' ' + getToken()
      }
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
                  router.push('/foods/list')
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
                  router.push('/foods/list')
                }
              })
            }
          }
        })
      },
      handleAvatarSuccess: (res: AxiosResultData<{ url: string }>, file: any) => {
        if (res && res.code === ApiStatusCode.OK) {
          model.value.image = res.data.url
          ElMessage.success(res.message || '上传成功')
        }
      },
      beforeAvatarUpload: (file: any) => {
        const trueType = ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)
        const isLt2M = file.size / 1024 / 1024 < 2

        console.log(file)

        if (!trueType) {
          ElMessage.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          ElMessage.error('上传头像图片大小不能超过 2MB!')
        }
        return trueType && isLt2M
      }
    })

    return {
      model,
      kindOptions,
      form,
      kindId,
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
