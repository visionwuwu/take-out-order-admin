import { MutationTree } from "vuex";
import { UserMutationTypes } from "./mutation-types";
import { UserSex, UserState } from "./state";

/** 用户模块的mutations类型定义 */
export type Mutations<S = UserState> = {
  [UserMutationTypes.SET_TOKEN](state: S, token: string): void
  [UserMutationTypes.SET_USERNAME](state: S, username: string): void
  [UserMutationTypes.SET_AVATAR](state: S, avatar: string): void
  [UserMutationTypes.SET_EMAIL](state: S, email: string): void
  [UserMutationTypes.SET_MOBILE](state: S, mobile: string): void
  [UserMutationTypes.SET_REMARKS](state: S, remarks: string): void
  [UserMutationTypes.SET_SEX](state: S, sex: UserSex): void
}

export const mutations: MutationTree<UserState> & Mutations = {
  [UserMutationTypes.SET_TOKEN]: (state, token) => {
    state.token = token
  },
  [UserMutationTypes.SET_USERNAME](state, username: string){
    state.username = username
  },
  [UserMutationTypes.SET_AVATAR](state, avatar: string) {
    state.avatar = avatar
  },
  [UserMutationTypes.SET_EMAIL](state, email: string) {
    state.email = email
  },
  [UserMutationTypes.SET_MOBILE](state, mobile: string) {
    state.mobile = mobile
  },
  [UserMutationTypes.SET_REMARKS](state, remarks: string) {
    state.remarks = remarks
  },
  [UserMutationTypes.SET_SEX](state, sex: UserSex) {
    state.sex = sex
  },
}