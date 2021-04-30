import { createStore } from 'vuex'

export interface StoreState {
  count: number
}

const store = createStore<StoreState>({
  state: {
    count: 0
  },
  getters: {
    doubleCount: (state) => {
      return state.count * 2
    }
  },
  mutations: {
    increment(state) {
      const innerState = state
      innerState.count += 1
    }
  },
  actions: {
    incrementAction: ({ commit }) => {
      commit('increment')
    }
  }
})

export default store
