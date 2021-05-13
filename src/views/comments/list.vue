<template>
  <div class="app-container">
    <!-- 筛选评论表单 -->
    <el-form :model="filterQuery" ref="formRef" :inline="true">
      <el-form-item label="评论名称">
        <el-input v-model="filterQuery.content" placeholder="请输入评论名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmitFilterForm">确定</el-button>
        <el-button @click="handleResetFilterForm">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- <div class="btn-container">
      <el-button type="success" icon="el-icon-edit" size="small" @click="handleEditOrCreateItem"
        >创建评论</el-button
      >
    </div> -->

    <!-- 评论表格容器 -->
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
        <el-table-column prop="id" label="ID" align="center" width="50"></el-table-column>
        <el-table-column prop="order" label="订单号" align="center" width="250">
          <template #default="scope">
            {{ scope.row.order.orderNumber ? scope.row.order.orderNumber : '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="user" label="评论用户" align="center">
          <template #default="scope">
            {{ scope.row.user ? scope.row.user.username : '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="images" label="图片" align="center">
          <template #default="scope">
            <el-image
              style="width: 50px"
              :src="formatCommaSplitPicture(scope.row.images)[0] || ''"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template #default="scope">
            <el-button
              @click="$router.push(`/comments/reply/${scope.row.id}`)"
              type="primary"
              size="mini"
              >回复</el-button
            >
            <el-button @click="handleEditOrCreateItem(scope.row)" type="success" size="mini"
              >查看</el-button
            >
            <el-button @click="handleDelItem(scope.row)" type="danger" size="mini">删除</el-button>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import Pagination from 'comps/Pagination/index.vue'
import { useList } from './models/commentModel'
import { formatCommaSplitPicture } from 'utils/helper'

export default defineComponent({
  name: 'CommentList',
  components: {
    Pagination
  },
  setup() {
    console.log('list setup')
    // 列表数据
    const router = useRouter()
    const { state, getList, delItem, formRef } = useList()

    // 定义所有的方法
    const methods = reactive({
      handleEditOrCreateItem: (row: any) => {
        const id = row.id
        if (id) {
          router.push(`/comments/edit/${id}`)
        } else {
          router.push(`/comments/create`)
        }
      },
      handleDelItem: async (row: any) => {
        const id = row.id
        if (id) {
          const res = await ElMessageBox({
            type: 'warning',
            title: '提示',
            message: `确认要删除吗？`
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
      handleSubmitFilterForm: () => {
        getList()
      },
      handleResetFilterForm: () => {
        state.filterQuery = { content: '' }
        getList()
        formRef.value.resetFields()
      }
    })

    return {
      ...toRefs(methods),
      ...toRefs(state),
      getList,
      formRef,
      formatCommaSplitPicture
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