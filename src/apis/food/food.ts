import { PageModel } from "@/common/model/pageModel";
import request, { AxiosResultData } from "@/utils/request";
import { FoodList, FoodListItem, FoodModel, LoadFoodListModel } from "./model/foodModel";

/** api接口请求地址 */
export enum ApiUrls {
  loadFoodList = '/foods/list',
  loadFoodSelect = '/foods/select',
  loadFoodById = '/foods',
  insertFood = '/foods/add',
  updateFoodById = '/foods',
  deleteFoodById = '/foods',
}

/**
 * 加载菜品种类列表
 * @param filterQuery 
 * @param page 
 */
export function reqFoodList<T = AxiosResultData<FoodList>>(filterQuery: LoadFoodListModel, page: PageModel) {
  const params = { ...filterQuery, pageSize: page.limit, pageNumber: page.page }
  return request<T>({
    method: 'get',
    url: ApiUrls.loadFoodList,
    params,
  })
}

/**
 * 根据id获取菜品种类信息
 * @param id 
 */
export function reqFoodById<T = AxiosResultData<FoodListItem>>(id: number) {
  return request<T>({
    method: 'get',
    url: `${ApiUrls.loadFoodById}/${id}`,
  })
}

/**
 * 创建菜品种类
 * @param data 
 * @returns 
 */
export function reqCreateFood<T = AxiosResultData>(data: FoodModel) {
  return request<T>({
    method: 'post',
    url: ApiUrls.insertFood,
    data
  })
}

/**
 * 根据id更新菜品种类
 * @param id 
 * @param data 
 * @returns 
 */
export function reqUpdateFood<T = AxiosResultData>(id: number, data: FoodModel) {
  return request<T>({
    method: 'put',
    url: `${ApiUrls.updateFoodById}/${id}`,
    data
  })
}

/**
 * 根据id删除菜品种类
 * @param id 
 */
export function reqDeleteFoodById<T = AxiosResultData>(id: number) {
  return request<T>({
    method: 'delete',
    url: `${ApiUrls.deleteFoodById}/${id}`
  })
}