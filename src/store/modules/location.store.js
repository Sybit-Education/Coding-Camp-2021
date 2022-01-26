import locationService from '@/services/location.service'

export const namespaced = true

export const state = {
  locationList: []
}

export const mutations = {
  UPDATE_LOCATION_LIST (state, payload) {
    state.locationList = payload
  }
}

export const actions = {
  async getLocationList ({ commit, getters }) {
    if (!getters.getLocationList || getters.getLocationList.length === 0) {
      try {
        commit('Loading/UPDATE_SHOW_LOADING_SPINNER', true, { root: true })
        const locations = await locationService.getLocationList()
        commit('UPDATE_LOCATION_LIST', locations)
        commit('Loading/UPDATE_SHOW_LOADING_SPINNER', false, { root: true })
      } catch (error) {
        console.warn(error)
        return null
      }
    }
  }
}

export const getters = {
  getLocationList (state) {
    return state.locationList
  }
}
