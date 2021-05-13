<template>
  <div class="page-login-container">
    <el-card
      v-loading="loading"
      element-loading-text="登录中..."
      element-loading-spinner="el-icon-loading"
      class="login-form-container"
      shadow="always"
      :body-style="{ padding: '20px' }"
    >
      <template #header>
        <h2 align="center">用户登录</h2>
      </template>
      <!-- card body -->
      <el-form
        :model="formModel"
        ref="formRef"
        :rules="rules"
        label-width="80px"
        label-position="top"
        size="normal"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            clearable
            v-model="formModel.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            clearable
            v-model="formModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="w-100" type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { Rules } from 'async-validator'
import { LoginModel } from 'apis/sys/model/userModel'
import { useAppStore } from 'store/index'
import { ElNotification } from 'element-plus'
import { UserActionTypes } from 'store/modules/user/action-types'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  setup() {
    const store = useAppStore()
    const router = useRouter()
    /** 表单引用 */
    const formRef = ref()
    /** 表单模型 */
    const formModel = reactive<LoginModel>({
      username: '',
      password: ''
    })
    /** 验证规则 */
    const rules: Rules = {
      username: [{ required: true, message: '用户名不能为空' }],
      password: [
        { required: true, message: '密码不能为空' },
        { min: 5, message: '密码不能低于5位' },
        { max: 15, message: '密码不能高于15位' }
      ]
    }

    /** 登录时Loading加载动画 */
    const loading = ref(false)

    /** 表单提交 */
    const onSubmit = (): void => {
      formRef.value.validate((valid: boolean) => {
        if (valid) {
          loading.value = true
          store
            .dispatch(UserActionTypes.ACTION_LOGIN, formModel)
            .then(() => {
              ElNotification({
                title: '登录成功',
                type: 'success',
                message: `欢迎${formModel.username}回来！！！`
              })
              router.push({
                path: '/'
              })
            })
            .catch(e => {
              console.log(e)
            })
            .finally(() => {
              loading.value = false
            })
        } else {
          return false
        }
      })
    }

    return {
      formModel,
      formRef,
      rules,
      onSubmit,
      loading
    }
  }
})
</script>

<style lang="scss" scoped>
.page-login-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background: url('assets/images/bg-xw.jpg') no-repeat center;
  background-size: cover;
  .login-form-container {
    width: 400px;
    // padding: 20px 0;
    h2 {
      margin: 0px;
      font-size: 18px;
    }
  }
}
</style>