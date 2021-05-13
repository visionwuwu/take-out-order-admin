import { UserState } from "store/modules/user/state";

/** 用户状态 */
export enum UserStatus {
  /** 启用 */
  enable = '1',
  /** 禁用 */
  disable = '0',
}

/** 用户登录模型 */
export interface LoginModel {
  username: string;
  password: string;
}

/**
 * Construct a type with the properties of T except for those in type K.
 */
// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
/** 用户信息 */
export type UserInfo =  Pick<UserState, Exclude<keyof UserState, 'token'>>

/** 登录返回的data */
export interface LoginResponseData extends UserInfo {
  token: string
}

/** 加载用户列表数据的query参数模型 */
export interface LoadUserListModel {
  username?: string
  status?: UserState | string
}

/** 用户列表项，每列字段 */
export interface UserListItem extends UserState {
  id?: number
  createUserId?: number | null
  createTime?: string
}

/** 用户列表 */
export type UserList = UserListItem[]

/** 创建用户模型 */
export interface UserModel extends Omit<UserState, 'token'> {
  password: string
  status: UserStatus
}