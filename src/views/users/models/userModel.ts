import { reactive, ref, onMounted } from 'vue'
import {
  reqUserList,
  reqUserById,
  delUserById,
  updateUserById,
  createUser,
  modifyUserPassword,
  modifyUserStatus
} from 'apis/sys/user'
import { UserStatus, UserModel } from '@/apis/sys/model/userModel'
import { UserSex } from '@/store/modules/user/state'

// 用户状态选项
export const userStatusOptions = [
  {
    label: '启用',
    value: UserStatus.enable
  },
  {
    label: '禁用',
    value: UserStatus.disable
  }
]

// 用户性别选项
export const userSexOptions = [
  {
    label: '男',
    value: UserSex.male
  },
  {
    label: '女',
    value: UserSex.famale
  },
  {
    label: '未知',
    value: UserSex.unknown
  }
]

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
      username: '',
      status: ''
    },
    options: [
      {
        label: '启用',
        value: UserStatus.enable
      },
      {
        label: '禁用',
        value: UserStatus.disable
      }
    ],
    dialogFormVisible: false,
    password: '',
    currentRow: {
      id: -1
    },
  })

  // 获取列表
  const getList = () => {
    state.loading = true

    reqUserList(state.filterQuery, state.listQuery)
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

  // 修改用户状态
  const updateUserStatus = (id: number, status: UserStatus) => {
    return modifyUserStatus(id, status)
  }

  // 修改用户密码
  const updateUserPassword = (id: number, password: string) => {
    return modifyUserPassword(id, password)
  }

  // 删除列表项
  const delItem = (id: number) => {
    state.loading = true
    return delUserById(id)
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
    updateUserStatus,
    updateUserPassword,
    formRef,
  }
}

const defaultItem: UserModel = {
  username: '',
  password: '',
  avatar: '',
  mobile: '',
  email: '',
  sex: UserSex.unknown,
  status: UserStatus.enable,
  remarks: ''
}

// 列表项逻辑抽离
export function useItem(isEdit: boolean, id: number) {
  const model = ref(Object.assign({}, defaultItem))

  // 如果是编辑就获取当前id对应的列表项
  onMounted(() => {
    if (isEdit && id) {
      reqUserById(id).then((res) => {
        console.log(res.data.data)
        model.value = res.data.data
      })
    }
  })

  // 更新某项列表
  const updateItem = (id: number, params: any) => {
    return updateUserById(id, params)
  }

  // 创建列表项
  const createItem = (params: any) => {
    return createUser(params)
  }

  return {
    model,
    updateItem,
    createItem
  }
}
