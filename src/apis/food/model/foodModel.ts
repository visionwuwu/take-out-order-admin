import { KindListItem } from "@/apis/kind/model/kindModel";

/** 菜品筛选数据模型 */
export interface LoadFoodListModel {
  name?: string
}

/** 菜品列表项数据模型 */
export interface FoodListItem {
  id?: number
  name: string
  image: string
  price: number
  kind?: KindListItem
  createTime?: string
}

/** 菜品列表数据模型 */
export type FoodList = FoodListItem[]

/** 创建or更新菜品数据模型 */
export interface FoodModel extends Omit<FoodListItem, 'id' | 'createTime'> {}