import { reactive, ref, onMounted } from 'vue'
import {
  reqCommentList,
  reqCommentById,
  reqCreateComment,
  reqUpdateComment,
  reqDeleteCommentById
} from 'apis/comment/comment'
import { CommentModel } from '@/apis/comment/model/commentModel'


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
      content: ''
    }
  })

  // 获取列表
  const getList = () => {
    state.loading = true

    reqCommentList(state.filterQuery ,state.listQuery)
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
    return reqDeleteCommentById(id)
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
    formRef,
  }
}

export const defaultItem: CommentModel = {
  content: '',
  images: '',
  shopReplyContent: '',
}

// 列表项逻辑抽离
export function useItem(isEdit: boolean, id: number) {
  const model = ref(Object.assign({}, defaultItem))

  // 如果是编辑就获取当前id对应的列表项
  onMounted(() => {
    if (isEdit && id) {
      reqCommentById(id).then((res) => {
        console.log(res.data.data)
        model.value = res.data.data
      })
    }
  })

  // 更新某项列表
  const updateItem = (id: number, params: any) => {
    return reqUpdateComment(id, params)
  }

  // 创建列表项
  const createItem = (params: any) => {
    return reqCreateComment(params)
  }

  return {
    model,
    updateItem,
    createItem
  }
}
