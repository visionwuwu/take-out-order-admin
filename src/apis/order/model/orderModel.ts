import { FoodList, FoodListItem } from "@/apis/food/model/foodModel";
import { UserModel } from "@/apis/sys/model/userModel";

/** 订单筛选数据模型 */
export interface LoadOrderListModel {
  orderNumber: string
}

/** 订单状态 */
export enum OrderStatus {
  /** 未发货 */
  unSendGoods = '0',
  /** 已发货 */
  sendGoods = '1',
  /** 已付款 */
  paid = '2',
  /** 未付款 */
  unPaid = '3',
  /** 已送达 */
  delivered = '4',
}

/** 订单食物的数据模型 */
export interface OrderFood {
  id: number,
  number: number,
  food: FoodListItem
}

/** 订单列表项数据模型定义 */
export interface OrderListItem {
  id?: number
  orderNumber: string
  price: number
  address?: string
  createTime?: string
  status?: OrderStatus
  remarks?: string
  user?: UserModel
  orderFoods?: OrderFood[]
}

/** 订单数据列表类型定义 */
export type OrderList = OrderListItem[]

/** 创建or更新订单数据模型 */
export interface OrderModel extends Omit<OrderListItem, 'id'> {}