import { PageModel } from '@/common/model/pageModel'
import request, { AxiosResultData } from 'utils/request'
import {
  UserModel,
  LoadUserListModel,
  LoginModel,
  LoginResponseData,
  UserInfo,
  UserList,
  UserListItem,
  UserStatus
} from './model/userModel'

/** api url */
enum ApiUrls {
  loadUserList = '/users/list',
  loadUserById = '/users',
  insertUser = '/users/add',
  updateUserById = '/users',
  deleteUserById = '/users',
  authLogin = 'auth/login',
  loadUserInfo = 'auth/userinfo',
  modifyUserStatus = '/users/resetStatus',
  modifyUserPassword = '/users/resetPwd',
  updateUserInfo = '/users/update/currentUserInfo'
}

/**
 * 系统用户登录
 * @param {*} params
 */
export function reqLogin<T = AxiosResultData<LoginResponseData>>(model: LoginModel) {
  return request<T>({
    url: ApiUrls.authLogin,
    method: 'post',
    data: model
  })
}

/**
 * 获取当前用户信息
 * @param {*} params
 */
export function reqUserInfo<T = AxiosResultData<UserInfo>>() {
  return request<T>({
    url: ApiUrls.loadUserInfo,
    method: 'get'
  })
}

/**
 * 请求用户列表数据
 * @param {*} params
 */
export function reqUserList<T = AxiosResultData<UserList>>(
  filterQuery: LoadUserListModel,
  page: PageModel
) {
  const params = { ...filterQuery, pageSize: page.limit, pageNumber: page.page }
  return request<T>({
    url: ApiUrls.loadUserList,
    method: 'get',
    params
  })
}

/**
 * 根据id获取用户
 * @param {*} id
 */
export function reqUserById<T = AxiosResultData<UserModel>>(id: number) {
  return request<T>({
    method: 'get',
    url: `${ApiUrls.loadUserById}/${id}`,
  })
}

/**
 * 创建用户
 */
 export function createUser<T = AxiosResultData>(data: UserModel) {
  return request<T>({
    url: ApiUrls.insertUser,
    method: 'post',
    data
  })
}

/**
 * 根据id更新用户
 * @param {*} params
 */
export function updateUserById(id: number, data: UserModel) {
  return request({
    url: `${ApiUrls.updateUserById}/${id}`,
    method: 'put',
    data
  })
}

/**
 * 更新当前用户信息
 * @param {*} params
 */
 export function reqUpdateUserInfo(data: UserInfo) {
  return request({
    url: ApiUrls.updateUserInfo,
    method: 'put',
    data
  })
}

/**
 * 根据id修改用户状态
 * @param {*} id 
 * @param {*} status 
 */
 export function modifyUserStatus(id: number, status: UserStatus) {
  return request({
    url: `${ApiUrls.modifyUserStatus}/${id}`,
    method: 'patch',
    data: { status }
  })
}

/**
 * 根据id修改用户密码
 * @param {*} id 
 * @param {*} status 
 */
 export function modifyUserPassword(id: number, password: string) {
  return request({
    url: `${ApiUrls.modifyUserPassword}/${id}`,
    method: 'patch',
    data: { password }
  })
}

/**
 * 根据id删除用户
 * @param {*} params
 */
 export function delUserById(id: number) {
  return request({
    method: 'delete',
    url: `${ApiUrls.deleteUserById}/${id}`,
  })
}