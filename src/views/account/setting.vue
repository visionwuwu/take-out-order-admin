<template>
  <div class="app-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>个人信息设置</span>
        </div>
      </template>
      <el-row :gutter="20" justify="center" type="flex">
        <el-col :span="12">
          <el-form
            :model="model"
            ref="form"
            label-position="right"
            label-width="80px"
            size="medium"
          >
            <el-form-item label="姓名" prop="username">
              <el-input v-model="model.username" clearable placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
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
                <el-radio-button
                  v-for="item in userSexOptions"
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
              <el-button type="primary" @click="onSubmit">更新</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import defaultConfig from '@/config/default/default'
import { getToken } from '@/utils/cookies'
import { AxiosResultData } from '@/utils/request'
import { ApiStatusCode } from '@/common/enums/ApiStatusCode.enum'
import { userSexOptions } from '../users/models/userModel'
import { UserSex } from '@/store/modules/user/state'
import { checkEmail, checkPhone } from 'views/users/components/detail.vue'
import { ElMessage } from 'element-plus'
import { reqUpdateUserInfo, reqUserInfo } from '@/apis/sys/user'
import { useAppStore } from '@/store'
import { UserActionTypes } from '@/store/modules/user/action-types'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useAppStore()
    const router = useRouter()
    const state = reactive({
      model: {
        username: '',
        password: '',
        mobile: '',
        email: '',
        avatar: '',
        remarks: '',
        sex: UserSex.unknown
      },
      rules: {
        username: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        mobile: [
          { validator: checkPhone, trigger: 'blur' },
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        email: [{ validator: checkEmail, trigger: 'blur' }]
      },
      actions: import.meta.env.VITE_APP_UPLOAD_IMAGE_BASE_URL + '/files/single',
      headers: {
        Authorization: import.meta.env.VITE_BASE_BEARER + ' ' + getToken()
      },
      form: ref(),
      userSexOptions
    })

    const methods = reactive({
      onSubmit: () => {
        reqUpdateUserInfo(state.model).then(() => {
          ElMessage.success('更新成功')
          if (state.model.password) {
            // 需要重新登录
            store.dispatch(UserActionTypes.ACTION_LOGIN_OUT).then(() => {
              router.push('/login')
            })
          }
        })
      },
      handleAvatarSuccess: (res: AxiosResultData<{ url: string }>, file: any) => {
        if (res && res.code === ApiStatusCode.OK) {
          state.model.avatar = res.data.url
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

    // 获取当前用户信息
    onMounted(() => {
      reqUserInfo().then((response) => {
        const { id, createTime, createUserId, status, ...restProps } = response.data.data as any
        state.model = restProps as any
        console.log(state.model)
      })
    })

    return {
      ...toRefs(state),
      ...toRefs(methods)
    }
  }
})
</script>

<style scoped></style>
