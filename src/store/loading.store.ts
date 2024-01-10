import { defineStore } from "pinia"

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    loadingSpinner: 0
  }),
  getters: {
    showLoadingSpinner: (state) =>  (state.loadingSpinner > 0) ? true : false
  },
  actions: {
    updateShowLoadingSpinner (payload: boolean) {
      if (payload === true) {
        this.loadingSpinner += 1
      } else {
        this.loadingSpinner -= 1
        if (this.loadingSpinner < 0) {
          this.loadingSpinner = 0
        }
      }
    }
  }
})
