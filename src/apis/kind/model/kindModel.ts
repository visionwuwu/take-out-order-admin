/** 菜品种类筛选数据模型 */
export interface LoadKindListModel {
  name?: string
}

/** 菜品种类列表项数据模型 */
export interface KindListItem {
  id?: number
  name: string
  image: string
  createTime?: string
}

/** 菜品种类列表数据模型 */
export type KindList = KindListItem[]

/** 创建or更新菜品种类数据模型 */
export interface KindModel extends Omit<KindListItem, 'id' | 'createTime'> {}