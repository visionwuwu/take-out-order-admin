import { ActionContext, ActionTree } from 'vuex'
import { UserActionTypes } from './action-types'
import { Mutations } from './mutations'
import { UserSex, UserState } from './state'
import { RootState } from 'store/index'
import { reqLogin, reqUserInfo } from 'apis/sys/user'
import { LoginModel, UserInfo } from 'apis/sys/model/userModel'
import { ApiStatusCode } from '@/common/enums/ApiStatusCode.enum'
import { UserMutationTypes } from './mutation-types'
import { removeToken, setToken } from 'utils/cookies'

/**
 * TS 常用的工具类型
 * 1. Parameters 获取函数的参数类型组成的元组类型
 * 2. extends 泛型约束
 * 3. ReturnType<T> 获取函数T的返回类型
 */
/** 增强的操作上下文 */
export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<UserState, RootState>, 'commit'>

/** 当前模块的Actions */
export interface Actions {
  [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    loginInfo: LoginModel
  ): Promise<any>,
  [UserActionTypes.ACTION_GET_USER_INFO]({ commit }: AugmentedActionContext): void,
  [UserActionTypes.ACTION_LOGIN_OUT]({ commit }: AugmentedActionContext): Promise<void>,
  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext): Promise<void>,
  [UserActionTypes.ACTION_SET_USER_INFO]({ commit }: AugmentedActionContext, userInfo: UserInfo): void
}

/**
 * 接口泛型:
 *  1. 第一个表示 当前模块的State
 *  2. 第二个表示 更模块的State
 */
export const actions: ActionTree<UserState, RootState> & Actions = {
  async [UserActionTypes.ACTION_LOGIN]({ commit, dispatch }, loginInfo) {
    const res = await reqLogin(loginInfo)
    if (res && res.data.code === ApiStatusCode.OK) {
      const { token, ...userInfo } = res.data.data
      commit(UserMutationTypes.SET_TOKEN, token)
      setToken(token)
      dispatch(UserActionTypes.ACTION_SET_USER_INFO, userInfo)
    }
    return res
  },
  async [UserActionTypes.ACTION_GET_USER_INFO]({ dispatch }) {
    const { data: res } = await reqUserInfo()
    const { code, data } = res
    if (code === ApiStatusCode.OK) {
      dispatch(UserActionTypes.ACTION_SET_USER_INFO, data)
    } 
  },
  async [UserActionTypes.ACTION_LOGIN_OUT]({ commit, dispatch }) {
    await dispatch(UserActionTypes.ACTION_RESET_TOKEN)
    removeToken()
    return Promise.resolve()
  },
  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }) {
    commit(UserMutationTypes.SET_TOKEN, '')
    setToken('')
    return Promise.resolve()
  },
  [UserActionTypes.ACTION_SET_USER_INFO]({ commit }, userInfo) {
    commit(UserMutationTypes.SET_USERNAME, userInfo.username)
    commit(UserMutationTypes.SET_AVATAR, userInfo.avatar as string)
    commit(UserMutationTypes.SET_EMAIL, userInfo.email as string)
    commit(UserMutationTypes.SET_MOBILE, userInfo.mobile as string)
    commit(UserMutationTypes.SET_SEX, userInfo.sex as UserSex)
    commit(UserMutationTypes.SET_REMARKS, userInfo.remarks as string)
  },
}
