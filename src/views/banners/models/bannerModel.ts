import { reactive, ref, onMounted } from 'vue'
import {
  reqBannerList,
  reqBannerById,
  reqCreateBanner,
  reqUpdateBannerById,
  reqDeleteBannerById
} from 'apis/banner/banner'
import { BannerModel } from '@/apis/banner/model/bannerModel'


// 用户列表逻辑抽离
export function useList() {
  // 列表所需的数据
  const state = reactive({
    loading: false,
    list: [],
    total: 0,
    listQuery: {
      page: 1,
      limit: 10
    },
  })

  // 获取列表
  const getList = () => {
    state.loading = true

    reqBannerList(state.listQuery)
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
    return reqDeleteBannerById(id)
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
  }
}

const defaultItem: BannerModel = {
  image: '',
  remarks: ''
}

// 列表项逻辑抽离
export function useItem(isEdit: boolean, id: number) {
  const model = ref(Object.assign({}, defaultItem))

  // 如果是编辑就获取当前id对应的列表项
  onMounted(() => {
    if (isEdit && id) {
      reqBannerById(id).then((res) => {
        console.log(res.data.data)
        model.value = res.data.data
      })
    }
  })

  // 更新某项列表
  const updateItem = (id: number, params: any) => {
    return reqUpdateBannerById(id, params)
  }

  // 创建列表项
  const createItem = (params: any) => {
    return reqCreateBanner(params)
  }

  return {
    model,
    updateItem,
    createItem
  }
}
