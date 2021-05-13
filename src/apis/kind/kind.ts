import { PageModel } from "@/common/model/pageModel";
import request, { AxiosResultData } from "@/utils/request";
import { KindList, KindListItem, KindModel, LoadKindListModel } from "./model/kindModel";

/** api接口请求地址 */
export enum ApiUrls {
  loadKindList = '/kinds/list',
  loadKindSelect = '/kinds/select',
  loadKindById = '/kinds',
  insertKind = '/kinds/add',
  updateKindById = '/kinds',
  deleteKindById = '/kinds',
}

/**
 * 加载菜品种类列表
 * @param filterQuery 
 * @param page 
 */
export function reqKindList<T = AxiosResultData<KindList>>(filterQuery: LoadKindListModel, page: PageModel) {
  const params = { ...filterQuery, pageSize: page.limit, pageNumber: page.page }
  return request<T>({
    method: 'get',
    url: ApiUrls.loadKindList,
    params,
  })
}

/**
 * 加载菜品种类下拉列表
 */
 export function reqKindSelect<T = AxiosResultData<KindList>>() {
  return request<T>({
    method: 'get',
    url: ApiUrls.loadKindSelect,
  })
}

/**
 * 根据id获取菜品种类信息
 * @param id 
 */
export function reqKindById<T = AxiosResultData<KindListItem>>(id: number) {
  return request<T>({
    method: 'get',
    url: `${ApiUrls.loadKindById}/${id}`,
  })
}

/**
 * 创建菜品种类
 * @param data 
 * @returns 
 */
export function reqCreateKind<T = AxiosResultData>(data: KindModel) {
  return request<T>({
    method: 'post',
    url: ApiUrls.insertKind,
    data
  })
}

/**
 * 根据id更新菜品种类
 * @param id 
 * @param data 
 * @returns 
 */
export function reqUpdateKind<T = AxiosResultData>(id: number, data: KindModel) {
  return request<T>({
    method: 'put',
    url: `${ApiUrls.updateKindById}/${id}`,
    data
  })
}

/**
 * 根据id删除菜品种类
 * @param id 
 */
export function reqDeleteKindById<T = AxiosResultData>(id: number) {
  return request<T>({
    method: 'delete',
    url: `${ApiUrls.deleteKindById}/${id}`
  })
}