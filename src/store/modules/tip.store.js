import tipService from '@/services/tip.service'

export const namespaced = true

export const state = {
  tipList: []
}

export const mutations = {
  UPDATE_TIP_LIST (state, payload) {
    state.tipList = payload
  }
}

export const actions = {
  async getTipRecords ({ commit, getters }) {
    if (!getters.getTipList || getters.getTipList.length === 0) {
      try {
        commit('Loading/UPDATE_SHOW_LOADING_SPINNER', true, { root: true })
        const tips = await tipService.getTipRecords()
        commit('UPDATE_TIP_LIST', tips)
        commit('Loading/UPDATE_SHOW_LOADING_SPINNER', false, { root: true })
        return tips
      } catch (error) {
        console.warn(error)
        return null
      }
    }
  }
}

export const getters = {
  getTipList: (state) => state.tipList,
  getTipById: (state) => (id) => state.tipList.find((tip) => tip.id === id)

}
