import { defineStore } from "pinia"

import locationService from '@/services/location.service'
import type Location from "@/types/location"
import { useLoadingStore } from "@/store/loading.store"

interface State {
  locationList: Array<Location>
  isLoading: boolean
}

export const useLocationStore = defineStore("location", {
  state: (): State =>  ({
      locationList: Array<Location>(),
      isLoading: false
  }),
  getters: {
    getLocationList: (state: State) => state.locationList as Array<Location>,
    getLocationListCount: (state: State) => state.locationList.length as Number
  },
  actions: {
    getLocationRecords() {
      if (!this.isLoading && (!this.locationList || this.locationList.length === 0)) {
        this.isLoading = true
        const loading = useLoadingStore()
        loading.updateShowLoadingSpinner(true)
        locationService.getLocationList()
          .then((result) => this.locationList = result)
          .catch((error) => console.error(error))
          .finally(() => {
            loading.updateShowLoadingSpinner(false)
            this.isLoading = false
          })
      }
    }
  }
})
