<template>
  <div class="app-container">
    <!-- 筛选用户表单 -->
    <el-form :model="filterQuery" ref="formRef" :inline="true">
      <el-form-item label="用户名">
        <el-input v-model="filterQuery.username" placeholder="请输入用户名" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="filterQuery.status" placeholder="请选择状态" clearable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmitFilterForm">确定</el-button>
        <el-button @click="handleResetFilterForm">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 创建用户按钮 -->
    <div class="btn-container">
      <el-button type="success" icon="el-icon-edit" size="small" @click="handleEditOrCreateItem"
        >创建用户</el-button
      >
    </div>

    <!-- 用户表格容器 -->
    <div class="table-container">
      <el-table
        v-loading="loading"
        element-loading-spinner="el-icon-loading"
        :data="list"
        border
        fit
        highlight-current-row
        class="w-100"
      >
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="username" label="用户名" align="center"></el-table-column>
        <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center" width="200"></el-table-column>
        <el-table-column prop="avatar" label="头像" align="center">
          <template #default="scope">
            <el-avatar size="medium" :src="scope.row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" align="center">
          <template #default="scope">
            <span v-if="scope.row.sex == UserSex.male">男</span>
            <span v-else-if="scope.row.sex == UserSex.famale">女</span>
            <span v-else>未知</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="UserStatus.enable"
              :inactive-value="UserStatus.disable"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled
              class="switch-user-status"
              @click="changeOpen(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="描述" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template #default="scope">
            <el-button
              @click="handleEditOrCreateItem(scope.row)"
              type="primary"
              size="mini"
              icon="el-icon-edit"
            />
            <el-button
              @click="handleDelItem(scope.row)"
              type="danger"
              size="mini"
              icon="el-icon-remove"
            />
            <el-button
              type="text"
              size="mini"
              style="color: #13ce66"
              @click="
                () => {
                  dialogFormVisible = true
                  currentRow = scope.row
                }
              "
              >重置密码</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <pagination
        v-model:page="listQuery.page"
        v-model:limit="listQuery.limit"
        :total="total"
        @pagination="getList"
      />
    </div>

    <el-dialog title="修改密码" v-model="dialogFormVisible" :width="500" @open="password = ''">
      <el-input v-focus v-model="password" autocomplete="off"></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleClickDialogConfirmBtn">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import Pagination from 'comps/Pagination/index.vue'
import { useList } from './models/userModel'
import { UserSex } from '@/store/modules/user/state'
import { UserStatus } from 'apis/sys/model/userModel'

export default defineComponent({
  name: 'UserList',
  components: {
    Pagination
  },
  setup() {
    console.log('list setup')
    // 用户列表数据
    const router = useRouter()
    const { state, getList, delItem, updateUserStatus, updateUserPassword, formRef } = useList()

    // 定义所有的方法
    const methods = reactive({
      handleEditOrCreateItem: (row: any) => {
        const id = row.id
        if (id) {
          router.push(`/users/edit/${id}`)
        } else {
          router.push(`/users/create`)
        }
      },
      handleDelItem: async (row: any) => {
        const id = row.id
        if (id) {
          const res = await ElMessageBox({
            type: 'warning',
            title: '提示',
            message: `确认要删除[${row.username}]用户吗？`
          })
          if (res === 'confirm') {
            await delItem(id)
            // TODO 一些业务处理
            // 提示用户
            ElMessage.error({
              type: 'error',
              message: '删除成功！'
            })
          }
        }
      },
      changeOpen: (row: any) => {
        const statusText = row.status === UserStatus.enable ? '禁用' : '启用'
        const message = `确定要[${statusText}] [${row.username}]用户吗？`
        ElMessageBox({
          type: 'warning',
          title: '提示',
          message
        }).then(() => {
          const status = row.status === UserStatus.enable ? UserStatus.disable : UserStatus.enable
          updateUserStatus(row.id, status).then((response) => {
            const { message } = response.data
            ElMessage.success(message || '修改状态成功')
            row.status = status
            getList()
          })
        })
      },
      handleClickDialogConfirmBtn: () => {
        updateUserPassword(state.currentRow.id, state.password)
          .then((response) => {
            const { message } = response.data
            ElMessage.success(message || '修改密码成功')
          })
          .finally(() => {
            state.dialogFormVisible = false
          })
      },
      handleSubmitFilterForm: () => {
        getList()
      },
      handleResetFilterForm: () => {
        state.filterQuery = {
          username: '',
          status: ''
        }
        getList()
        formRef.value.resetFields()
      }
    })

    return {
      ...toRefs(methods),
      ...toRefs(state),
      formRef,
      getList,
      UserSex,
      UserStatus
    }
  }
})
</script>

<style lang="scss" scoped>
.switch-user-status.el-switch.is-disabled {
  opacity: 1;
  .el-switch__core {
    cursor: pointer;
  }
}
.btn-container {
  margin: 15px 0;
}
</style>