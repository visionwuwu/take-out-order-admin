import { MutationTree } from 'vuex'
import { GlobalMutationTypes } from './mutation-types'
import { GlobalState } from './state'

export type Mutations<S = GlobalState> = {
  [GlobalMutationTypes.INCREMENT_COUNT](state: S): void
}

export const mutations: MutationTree<GlobalState> & Mutations = {
  [GlobalMutationTypes.INCREMENT_COUNT](state) {
    state.count += 1
  }
}