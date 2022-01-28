import materialService from '@/services/material.service'

export const namespaced = true

export const state = {
  materialList: []
}

export const mutations = {
  UPDATE_MATERIAL_LIST (state, { list }) {
    state.materialList = list
  }
}

export const actions = {
  getMaterialRecords ({ commit, getters }) {
    if (!getters.getMaterialList || getters.getMaterialList.length === 0) {
      try {
        commit('Loading/UPDATE_SHOW_LOADING_SPINNER', true, { root: true })
        materialService.getMaterialRecords().then((list) => {
          commit('UPDATE_MATERIAL_LIST', { list })
          commit('Loading/UPDATE_SHOW_LOADING_SPINNER', false, { root: true })
        })
      } catch (error) {
        console.warn(error)
        return null
      }
    }
  }
}

export const getters = {
  getMaterialList (state) {
    return state.materialList
  },
  getMaterialByName: (state) => (name) => {
    name = name.toLowerCase()
    return state.materialList.find((material) => material.name.toLowerCase() === name)
  },
  getMaterialById: (state) => (id) => {
    return state.materialList.find((material) => material.id === id)
  }
}
