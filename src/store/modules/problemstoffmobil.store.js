import problemstoffmobilService from '@/services/problemstoffmobil.service'

export const namespaced = true

export const state = {
  eventList: []
}

export const mutations = {
  UPDATE_EVENT_LIST (state, payload) {
    state.eventList = payload
  }
}

export const actions = {
  async getEventRecords ({ commit, getters }) {
    if (!getters.getEventList || getters.getEventList.length === 0) {
      try {
        commit('Loading/UPDATE_SHOW_LOADING_SPINNER', true, { root: true })
        const events = await problemstoffmobilService.getEventRecords()
        commit('UPDATE_EVENT_LIST', events)
        commit('Loading/UPDATE_SHOW_LOADING_SPINNER', false, { root: true })
      } catch (error) {
        console.warn(error)
      }
    }
  }
}

export const getters = {
  getEventList: (state) => state.eventList,
  getEventById: (state) => (id) => state.eventList.find((event) => event.id === id)

}
