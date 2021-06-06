import { reactive, ref, onMounted } from 'vue'
import {
  reqOrderList,
  reqDelOrderById,
  reqOrderById,
  reqModifyOrderStatus,
} from 'apis/order/order'
import { OrderModel, OrderStatus } from '@/apis/order/model/orderModel'
import variables from 'styles/_variables.module.scss'

export const orderStatusItems = [
  { color: variables.primary, label: '已发货', value: OrderStatus.sendGoods },
  { color: variables.warning, label: '未发货', value: OrderStatus.unSendGoods },
  { color: variables.danger, label: '未付款', value: OrderStatus.unPaid },
  { color: variables.info, label: '已付款', value: OrderStatus.paid },
  { color: variables.success, label: '已送达', value: OrderStatus.delivered },
  { color: variables.magenta, label: '已取消', value: OrderStatus.cancelled },
  { color: variables.purple, label: '已评价', value: OrderStatus.evaluated },
]

// 订单列表逻辑抽离
export function useList() {
  // 筛选表单组件引用
  const formRef = ref()

  // 列表所需的数据
  const state = reactive({
    loading: false,
    list: [],
    total: 0,
    listQuery: {
      page: 1,
      limit: 10
    },
    filterQuery: {
      orderNumber: ''
    }
  })

  // 获取列表
  const getList = () => {
    state.loading = true

    reqOrderList(state.filterQuery, state.listQuery)
      .then((res) => {
        // 数据获取成功更新state
        const { data, total } = res.data
        state.list = data as any
        state.total = total as number
      })
      .finally(() => {
        state.loading = false
      })
  }

  // 修改订单状态
  const updateOrderStatus = (id: number, status: OrderStatus) => {
    return reqModifyOrderStatus(id, status)
  }

  // 删除列表项
  const delItem = (id: number) => {
    state.loading = true
    return reqDelOrderById(id)
      .then(() => {
        getList()
      })
      .finally(() => {
        state.loading = false
      })
  }

  // 获取订单列表数据
  getList()

  return {
    state,
    getList,
    delItem,
    formRef,
    updateOrderStatus
  }
}

const defaultItem: OrderModel = {
  orderNumber: '',
  price: 0,
  address: '',
  status: OrderStatus.unPaid,
  remarks: '',
  orderFoods: [],
}

// 列表项逻辑抽离
export function useItem(id: number) {
  const model = ref(Object.assign({}, defaultItem))

  // 如果是编辑就获取当前id对应的列表项
  onMounted(() => {
    if (id) {
      reqOrderById(id).then((res) => {
        console.log(res.data.data)
        model.value = res.data.data
      })
    }
  })

  return {
    model,
    orderStatusItems,
  }
}
