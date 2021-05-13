import { ActionContext, ActionTree } from 'vuex'
import { RootState } from 'store/index';
import { GlobalActionTypes } from "./action-types";
import { Mutations } from './modules/user/mutations';
import { GlobalState } from './state';
import { GlobalMutationTypes } from './mutation-types';

/** 增强的操作类型上下文 */
export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<GlobalState, RootState>, 'commit'>

/** 全局Actions对象类型定义 */
export interface Actions {
  [GlobalActionTypes.ACTION_INCREMENT_COUNT]({ commit }: AugmentedActionContext): void
}

export const actions: ActionTree<GlobalState, RootState> = {
  [GlobalActionTypes.ACTION_INCREMENT_COUNT]({ commit }) {
    commit(GlobalMutationTypes.INCREMENT_COUNT)
  }
}