<template>
  <div class="app-container">
    <div class="btn-container">
      <el-button type="success" icon="el-icon-edit" size="small" @click="handleEditOrCreateItem"
        >创建轮播图片</el-button
      >
    </div>

    <!-- 轮播图表格容器 -->
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
        <el-table-column prop="image" label="图片" align="center">
          <template #default="scope">
            <el-image style="width: 100px;" :src="scope.row.image" :preview-src-list="[scope.row.image]">
            </el-image>
            <!-- <el-avatar size="large" shape="square" :src="scope.row.image"></el-avatar> -->
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
import { useList } from './models/bannerModel'

export default defineComponent({
  name: 'BannerList',
  components: {
    Pagination
  },
  setup() {
    console.log('list setup')
    // 列表数据
    const router = useRouter()
    const { state, getList, delItem } = useList()

    // 定义所有的方法
    const methods = reactive({
      handleEditOrCreateItem: (row: any) => {
        const id = row.id
        if (id) {
          router.push(`/banners/edit/${id}`)
        } else {
          router.push(`/banners/create`)
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
      }
    })

    return {
      ...toRefs(methods),
      ...toRefs(state),
      getList
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