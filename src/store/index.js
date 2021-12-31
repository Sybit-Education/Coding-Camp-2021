import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import * as airtableService from '@/services/airtable.service'
import * as locationService from '@/services/location.service'
import materialService from '@/services/material.service'
import targetService from '@/services/target.service'
import tipService from '@/services/tip.service'
import { setCookie } from '@/services/cookie.service'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    showLoadingSpinner: false,
    materialList: [],
    targetList: [],
    locations: [],
    tipList: [],
    // Making sure that we're doing
    // everything correctly by enabling
    // strict mode in the dev environment.
    strict: process.env.NODE_ENV !== 'production',
    plugins: debug ? [createLogger()] : []
  },

  getters: {
    showLoadingSpinner (state) {
      return state.showLoadingSpinner
    },
    getMaterialList (state) {
      return state.materialList
    },
    getMaterialByName: (state) => (name) => {
      name = name.toLowerCase()
      return state.materialList.find((material) => material.name.toLowerCase() === name)
    },
    getMaterialById: (state) => (id) => {
      return state.materialList.find((material) => material.id === id)
    },
    getTargetById: (state) => (id) => {
      return state.targetList.find((target) => target.id === id)
    },
    getLocations (state) {
      return state.locations
    },
    getTipList: (state) => state.tipList,
    getTipById: (state) => (id) => state.tipList.find((tip) => tip.id === id)
  },

  mutations: {
    UPDATE_MATERIAL_LIST (state, payload) {
      state.materialList = payload
    },
    UPDATE_TARGET_LIST (state, payload) {
      state.targetList = payload
    },
    UPDATE_SHOW_LOADING_SPINNER (state, showLoadingSpinner) {
      state.showLoadingSpinner = showLoadingSpinner
    },
    UPDATE_LOCATION_LIST (state, payload) {
      state.locations = payload
    },
    UPDATE_TIP_LIST (state, payload) {
      state.tipList = payload
    },
    MERGE_TARGETS_WITH_MATERIAL (state) {
      state.materialList.forEach((materialEntry) => {
        if (
          materialEntry?.targets !== undefined &&
          materialEntry?.targets?.length > 0
        ) {
          materialEntry.targets.forEach((targetId) => {
            const foundTarget = state.targetList.find((targetEntry) => {
              return targetEntry.id === targetId
            })
            materialEntry.targets.push(foundTarget)
          })
          materialEntry.targets = materialEntry?.targets.filter(
            (targetEntry) => typeof targetEntry === 'object'
          )
        }
      })
    }
  },

  actions: {
    async getLocations ({ commit }) {
      try {
        const locations = await locationService.getLocations()
        commit('UPDATE_LOCATION_LIST', locations)
      } catch (error) {
        console.warn(error)
        return null
      }
    },
    async getLocationsFromSessionStorage ({ dispatch, commit }) {
      const recordsFromSessionStorage = airtableService.getRecordsFromSessionStorage('locations')
      if (recordsFromSessionStorage) {
        commit('UPDATE_LOCATION_LIST', recordsFromSessionStorage)
      } else {
        dispatch('getLocations')
      }
    },
    async getMaterialRecords ({ commit }) {
      try {
        commit('UPDATE_SHOW_LOADING_SPINNER', true)
        const material = await materialService.getMaterialRecords()
        commit('UPDATE_MATERIAL_LIST', material)
      } catch (error) {
        console.warn(error)
        return null
      }
    },
    async getTargetRecords ({ commit }) {
      try {
        const targets = await targetService.getTargetRecords()
        commit('UPDATE_TARGET_LIST', targets)
        commit('UPDATE_SHOW_LOADING_SPINNER', false)
      } catch (error) {
        console.warn(error)
        return null
      }
    },
    async getTipRecords ({ commit }) {
      try {
        commit('UPDATE_SHOW_LOADING_SPINNER', true)
        const tips = await tipService.getTipRecords()
        commit('UPDATE_TIP_LIST', tips)
        commit('UPDATE_SHOW_LOADING_SPINNER', false)
        return tips
      } catch (error) {
        console.warn(error)
        return null
      }
    },
    async getMaterialAndTargets ({ dispatch, commit }) {
      try {
        await dispatch('getMaterialRecords')
        await dispatch('getTargetRecords')
        setCookie('recordsExpiryCookie', 'recordsAreInSessionStorage', process.env.VUE_APP_RECORDS_COOKIE_LIFETIME_IN_MINUTES)
        commit('MERGE_TARGETS_WITH_MATERIAL')
      } catch (error) {
        console.warn(error)
        return null
      }
    },
    async getRecordsFromSessionStorage ({ dispatch, commit }, payload) {
      commit('UPDATE_SHOW_LOADING_SPINNER', true)
      const getFromSessionStorageAttempts = []
      const recordMap = {
        material: {
          commitName: 'UPDATE_MATERIAL_LIST',
          actionName: 'getMaterialRecords'
        },
        targets: {
          commitName: 'UPDATE_TARGET_LIST',
          actionName: 'getTargetRecords'
        }
      }

      for (const record of payload) {
        const recordsFromSessionStorage =
          airtableService.getRecordsFromSessionStorage(record)
        if (recordsFromSessionStorage) {
          commit(`${recordMap[record].commitName}`, recordsFromSessionStorage)
          getFromSessionStorageAttempts.push(true)
        } else {
          getFromSessionStorageAttempts.push(false)
        }
      }

      if (getFromSessionStorageAttempts.some((attempt) => attempt === false)) {
        dispatch('getMaterialAndTargets')
      } else if (
        getFromSessionStorageAttempts.every((attempt) => attempt === true)
      ) {
        commit('MERGE_TARGETS_WITH_MATERIAL')
        commit('UPDATE_SHOW_LOADING_SPINNER', false)
      }
    },
    updateShowLoadingSpinner ({ commit }, payload) {
      commit('UPDATE_SHOW_LOADING_SPINNER', payload)
    }
  }
})
