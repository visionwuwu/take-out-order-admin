import { reactive, ref, onMounted } from 'vue'
import {
  reqFoodList,
  reqFoodById,
  reqCreateFood,
  reqUpdateFood,
  reqDeleteFoodById
} from 'apis/food/food'
import { reqKindSelect } from 'apis/kind/kind'
import { FoodListItem } from '@/apis/food/model/foodModel'
import { defaultItem as kindItem } from 'views/kinds/models/kindModel'
import { KindList } from '@/apis/kind/model/kindModel'

// 用户列表逻辑抽离
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
      name: ''
    }
  })

  // 获取列表
  const getList = () => {
    state.loading = true

    reqFoodList(state.filterQuery, state.listQuery)
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

  // 删除列表项
  const delItem = (id: number) => {
    state.loading = true
    return reqDeleteFoodById(id)
      .then(() => {
        getList()
      })
      .finally(() => {
        state.loading = false
      })
  }

  // 获取用户列表数据
  getList()

  return {
    state,
    getList,
    delItem,
    formRef
  }
}

const defaultItem: FoodListItem = {
  name: '',
  price: 0,
  kind: kindItem,
  image: ''
}

// 列表项逻辑抽离
export function useItem(isEdit: boolean, id: number) {
  const model = ref(Object.assign({}, defaultItem))
  const kindOptions = ref<KindList>([])

  // 如果是编辑就获取当前id对应的列表项
  onMounted(() => {
    if (isEdit && id) {
      reqFoodById(id).then((res) => {
        model.value = res.data.data
      })
    }
  })

  /** 获取菜品种类下拉列表 */
  onMounted(() => {
    reqKindSelect().then((response) => {
      const data = response.data.data
      if (data) {
        kindOptions.value = data;
      }
    })
  })

  // 更新某项列表
  const updateItem = (id: number, params: any) => {
    return reqUpdateFood(id, params)
  }

  // 创建列表项
  const createItem = (params: any) => {
    return reqCreateFood(params)
  }


  return {
    model,
    kindOptions,
    updateItem,
    createItem,
  }
}
