import targetService from '@/services/target.service'

export const namespaced = true

export const state = {
  targetList: []
}

export const mutations = {
  UPDATE_TARGET_LIST (state, payload) {
    state.targetList = payload
  }
}

export const actions = {
  async getTargetRecords ({ commit, getters }) {
    if (!getters.getTargetList || getters.getTargetList.length === 0) {
      try {
        commit('Loading/UPDATE_SHOW_LOADING_SPINNER', true, { root: true })
        const targets = await targetService.getTargetRecords()
        commit('UPDATE_TARGET_LIST', targets)
        commit('Loading/UPDATE_SHOW_LOADING_SPINNER', false, { root: true })
      } catch (error) {
        console.warn(error)
        return null
      }
    }
  }
}

export const getters = {
  getTargetList: (state) => state.targetList,
  getTargetById: (state) => (id) => {
    return state.targetList.find((target) => target.id === id)
  }
}
