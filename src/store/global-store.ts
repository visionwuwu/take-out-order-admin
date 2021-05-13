import { CommitOptions, DispatchOptions, Module, Store } from 'vuex'
import { GlobalState, state } from "./state";
import { Mutations, mutations } from './mutations'
import { Actions, actions } from './actions'
import { RootState } from 'store/index';
import { Getters, getters } from './getters';

export type GlobalStore<S = GlobalState> = Omit<Store<S>, 'commit' | 'getters' | 'dispatch'>
& {
  commit<K extends keyof Mutations,  P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions,
  ): ReturnType<Actions[K]>
} & {
  getters<K extends keyof Getters>(
    key: K,
    getters: any,
    rootState: RootState,
    rootGetters: any,
  ): ReturnType<Getters[K]>
}

export const store: Module<GlobalState, RootState> = {
  state,
  getters,
  mutations,
  actions,
  // TODO: With namespaced option turned on, having problem how to use dispatch with action types...
  // But without it, a bigger store might have clashes in namings
  // namespaced: true,
}