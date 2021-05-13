<template>
  <el-pagination
    class="pagination"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    background
    :layout="layout"
    :current-page="page"
    :page-size="limit"
    :page-sizes="pageSizes"
    :total="total"
  ></el-pagination>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'Pagination',
  props: {
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    total: {
      type: Number,
      default: 0
    },
    layout: {
      type: String,
      default: 'total,sizes,prev,pager,next,jumper'
    }
  },
  emits: ['pagination', 'update:page', 'update:limit'],
  setup(props, context) {
    const handleSizeChange = (size: number) => {
      context.emit('update:limit', size)
      context.emit('pagination')
    }

    const handleCurrentChange = (page: number) => {
      context.emit('update:page', page)
      context.emit('pagination')
    }

    return {
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped>
.pagination {
  margin: 15px 0;
  text-align: center;
}
</style>