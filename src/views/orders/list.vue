<template>
  <div class="app-container">
    <!-- 筛选订单表单 -->
    <el-form :model="filterQuery" ref="formRef" :inline="true">
      <el-form-item label="订单号">
        <el-input v-model="filterQuery.orderNumber" placeholder="请输入订单号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmitFilterForm">确定</el-button>
        <el-button @click="handleResetFilterForm">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 订单表格容器 -->
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
        <el-table-column
          prop="orderNumber"
          label="订单号"
          align="center"
          width="250"
        ></el-table-column>
        <el-table-column prop="user" label="下单用户" align="center">
          <template #default="scope">
            {{ scope.row.user.username }}
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" align="center">
          <template #default="scope">
            <el-tag type="success" size="small">{{ scope.row.price }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="配送地址"
          align="center"
          width="250"
        ></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template #default="scope">
            <div v-for="item in orderStatusItems" :key="item.label">
              <el-tag
                v-if="item.value === scope.row.status"
                :type="item.type"
                size="small"
                effect="dark"
                >{{ item.label }}</el-tag
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="描述" width="200" align="center"></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="300" fixed="right">
          <template #default="scope">
            <el-button
              v-orderStatus="{
                status: scope.row.status,
                allows: [OrderStatus.paid]
              }"
              type="primary"
              size="mini"
              @click="handleSendGoods(scope.row)"
              >配送</el-button
            >
            <el-button
              v-orderStatus="{
                status: scope.row.status,
                allows: [OrderStatus.sendGoods]
              }"
              type="success"
              size="mini"
              @click="handleDelivered(scope.row)"
              >已送达</el-button
            >
            <el-button
              type="warning"
              size="mini"
              @click="$router.push(`/orders/detail/${scope.row.id}`)"
              >详情</el-button
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
import { ElMessage, ElMessageBox } from 'element-plus'
import Pagination from 'comps/Pagination/index.vue'
import { useList, orderStatusItems } from './models/orderModel'
import { OrderStatus } from '@/apis/order/model/orderModel'

export default defineComponent({
  name: 'UserList',
  components: {
    Pagination
  },
  setup() {
    console.log('list setup')
    // 订单列表数据
    const { state, getList, delItem, formRef, updateOrderStatus } = useList()

    // 定义所有数据
    const data = reactive({
      orderStatusItems,
      OrderStatus
    })

    // 定义所有的方法
    const methods = reactive({
      handleDelItem: async (row: any) => {
        const id = row.id
        if (id) {
          const res = await ElMessageBox({
            type: 'warning',
            title: '提示',
            message: `确认要删除id为[ ${row.id} ]订单吗？`
          })
          if (res === 'confirm') {
            await delItem(id)
            // TODO 一些业务处理
            // 提示订单
            ElMessage.error({
              type: 'error',
              message: '删除成功！'
            })
          }
        }
      },
      // changeOpen: (row: any) => {
      //   const statusText = row.status === UserStatus.enable ? '禁用' : '启用'
      //   const message = `确定要[${statusText}] [${row.username}]订单吗？`
      //   ElMessageBox({
      //     type: 'warning',
      //     title: '提示',
      //     message
      //   }).then(() => {
      //     const status = row.status === UserStatus.enable ? UserStatus.disable : UserStatus.enable
      //     updateUserStatus(row.id, status).then((response) => {
      //       const { message } = response.data
      //       ElMessage.success(message || '修改状态成功')
      //       row.status = status
      //       getList()
      //     })
      //   })
      // },
      handleSubmitFilterForm: () => {
        getList()
      },
      handleResetFilterForm: () => {
        state.filterQuery = { orderNumber: '' }
        getList()
        formRef.value.resetFields()
      },
      handleSendGoods: (row: any) => {
        updateOrderStatus(row.id, OrderStatus.sendGoods).then(() => {
          getList()
        })
      },
      handleDelivered: (row: any) => {
        updateOrderStatus(row.id, OrderStatus.delivered).then(() => {
          getList()
        })
      }
    })

    return {
      ...toRefs(methods),
      ...toRefs(state),
      ...toRefs(data),
      formRef,
      getList
    }
  }
})
</script>

<style lang="scss" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
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
