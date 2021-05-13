import { GetterTree } from 'vuex'
import { RootState } from '.'
import { GlobalState } from './state'

/** 全局getter的函数名称枚举 */
export enum GlobalGetterTypes {
  doubleCount = 'doubleCount'
}

/** 全局getters对象类型声明 */
export type Getters<S = GlobalState> = {
  [GlobalGetterTypes.doubleCount](state: S): number
}


export const getters: GetterTree<GlobalState, RootState> & Getters = {
  [GlobalGetterTypes.doubleCount](state) {
    return state.count * 2
  }
}