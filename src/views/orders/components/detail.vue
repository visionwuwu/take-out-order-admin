<template>
  <div class="app-container">
    <el-card shadow="always" :body-style="{ padding: '20px' }" style="margin-bottom: 15px">
      <el-page-header @back="$router.go(-1)" content="订单详情"></el-page-header>
    </el-card>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div>
        <span>订单号：{{ model.orderNumber }}</span>
        <el-divider></el-divider>
        <span>配送地址：{{ model.address }}</span>
        <el-divider></el-divider>
        <span>下单时间：{{ model.createTime }}</span>
        <el-divider></el-divider>
        订单状态：
        <template v-for="item in orderStatusItems" :key="item.label">
          <el-tag
            v-if="item.value === model.status"
            :type="item.type"
            size="small"
            effect="dark"
            >{{ item.label }}</el-tag
          >
        </template>
        <el-divider></el-divider>
        <span>备注：{{ model.remarks }}</span>
        <el-divider></el-divider>
        <p>菜品详情</p>
        <el-table :data="orderFoods" border stripe>
          <el-table-column prop="id" label="ID" width="50" align="center"></el-table-column>
          <el-table-column prop="name" label="菜品" align="center"></el-table-column>
          <el-table-column prop="number" label="数量" align="center"></el-table-column>
          <el-table-column prop="price" label="总价" align="center"></el-table-column>
          <el-table-column prop="image" label="图片" align="center">
            <template #default="scope">
              <el-image
                style="width: 50px"
                :src="scope.row.image"
                :preview-src-list="[scope.row.image]"
              >
              </el-image>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useItem } from '../models/orderModel'

export default defineComponent({
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const route = useRoute()
    const id = parseInt(route.params.id as string)
    const { model, orderStatusItems } = useItem(id)

    const orderFoods = computed(() => {
      const orderFoods = model.value.orderFoods
      let res: any = []
      if (orderFoods) {
        res = orderFoods.map((v: any) => {
          return {
            id: v.id,
            number: v.number,
            price: v.food.price * v.number,
            name: v.food.name,
            image: v.food.image
          }
        })
      }
      return res
    })

    return {
      model,
      orderFoods,
      orderStatusItems
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