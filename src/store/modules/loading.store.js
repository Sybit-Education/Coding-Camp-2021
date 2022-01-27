
export const namespaced = true

export const state = {
  showLoadingSpinner: 0
}

export const mutations = {
  UPDATE_SHOW_LOADING_SPINNER (state, payload) {
    if (payload === true) {
      state.showLoadingSpinner += 1
    } else {
      state.showLoadingSpinner -= 1
      if (state.showLoadingSpinner < 0) {
        state.showLoadingSpinner = 0
      }
    }
  }
}

export const actions = {
  updateShowLoadingSpinner ({ commit }, payload) {
    commit('Loading/UPDATE_SHOW_LOADING_SPINNER', payload)
  }
}

export const getters = {
  showLoadingSpinner (state) {
    return state.showLoadingSpinner > 0
  }
}
