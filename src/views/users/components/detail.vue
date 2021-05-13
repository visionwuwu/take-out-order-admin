<template>
  <div class="app-container">
    <el-card shadow="always" :body-style="{ padding: '20px' }" style="margin-bottom: 15px">
      <el-page-header
        @back="$router.go(-1)"
        :content="isEdit ? '更新用户' : '新建用户'"
      ></el-page-header>
    </el-card>

    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <el-form :model="model" :rules="rules" ref="form" label-position="top">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="model.username" clearable placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!isEdit">
          <el-input
            v-model="model.password"
            type="password"
            clearable
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="model.mobile" clearable placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="model.email" clearable placeholder="请输入邮箱号"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            :action="actions"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="model.avatar" :src="model.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group placeholder="请选择性别" v-model="model.sex">
            <el-radio-button v-for="item in userSexOptions" :key="item.value" :label="item.value">
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group placeholder="请选择状态" v-model="model.status">
            <el-radio-button
              v-for="item in userStatusOptions"
              :key="item.value"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            v-model="model.remarks"
            placeholder="请输入描述"
            clearable
            maxlength="150"
            minlength="5"
            show-word-limit
          ></el-input>
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
import { ref, reactive, defineComponent, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { useItem, userSexOptions, userStatusOptions } from '../models/userModel'
import { isPhone, validEmail } from 'utils/validate'
import defaultConfig from '@/config/default/default'
import { getToken } from '@/utils/cookies'
import { AxiosResultData } from '@/utils/request'
import { ApiStatusCode } from '@/common/enums/ApiStatusCode.enum'

export function checkPhone(rule: any, value: any, callback: any) {
  if (!isPhone(value)) {
    callback(new Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}

export function checkEmail(rule: any, value: any, callback: any) {
  if (value && !validEmail(value)) {
    callback(new Error('请输入正确的邮箱号'))
  } else {
    callback()
  }
}
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
      rules: {
        username: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        mobile: [
          { validator: checkPhone, trigger: 'blur' },
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        email: [{ validator: checkEmail, trigger: 'blur' }]
      },
      actions: defaultConfig.apiBaseUrl + '/files/single',
      headers: {
        Authorization: import.meta.env.VITE_BASE_BEARER + ' ' + getToken()
      },
      userSexOptions,
      userStatusOptions
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
                  router.push('/users/list')
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
                  router.push('/users/list')
                }
              })
            }
          }
        })
      },
      handleAvatarSuccess: (res: AxiosResultData<{ url: string }>, file: any) => {
        if (res && res.code === ApiStatusCode.OK) {
          model.value.avatar = res.data.url
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
