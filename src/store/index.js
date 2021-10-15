import Vue from 'vue'
import Vuex from 'vuex'
import * as airtableService from '@/services/airtable.service'
import * as trashcanService from '../services/trashcan.service'
import materialService from '@/services/material.service'
import targetService from '@/services/target.service'
import tipService from '../services/tip.service'
import { setCookie } from '../services/cookie.service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showLoadingSpinner: false,
    materialList: [],
    targetList: [],
    trashCans: [],
    tipList: []
  },

  getters: {
    showLoadingSpinner (state) {
      return state.showLoadingSpinner
    },
    getMaterialList (state) {
      return state.materialList
    },
    getMaterialByName: (state) => (name) => {
      return state.materialList.find((material) => material.name === name)
    },
    getTargetById: (state) => (id) => {
      return state.targetList.find((target) => target.id === id)
    },
    getTrashCans (state) {
      return state.trashCans
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
    UPDATE_TRASHCAN_LIST (state, payload) {
      state.trashCans = payload
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
    async getTrashCans ({ commit }) {
      try {
        const trashCans = await trashcanService.getTrashCans()
        commit('UPDATE_TRASHCAN_LIST', trashCans)
      } catch (error) {
        console.warn(error)
        return null
      }
    },
    async getTrashCansFromSessionStorage ({ dispatch, commit }) {
      const recordsFromSessionStorage = airtableService.getRecordsFromSessionStorage('trashCans')
      if (recordsFromSessionStorage) {
        commit('UPDATE_TRASHCAN_LIST', recordsFromSessionStorage)
      } else {
        dispatch('getTrashCans')
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
