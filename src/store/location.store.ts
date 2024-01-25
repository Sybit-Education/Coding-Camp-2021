import { defineStore } from "pinia"

import locationService from '@/services/location.service'
import type Location from "@/types/location"
import { useLoadingStore } from "@/store/loading.store"
import { toast } from 'vuetify-sonner'

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
    filteredLocationList: (state: State) => (locationTypes: Array<string>) => {
      if (locationTypes && locationTypes.length > 0) {
        const locList = state.locationList
        const list = Array<Location>()
        locationTypes.forEach((type) => {
          const filteredList = locList.filter((loc) => {
            return loc.type === type
          })
          list.push(...filteredList)
        })
        return list
      } else {
        return state.locationList
      }
    },
    getLocationListCount: (state: State) => state.locationList.length as Number
  },
  actions: {
    async getLocationRecords() {
      if (!this.isLoading && (!this.locationList || this.locationList.length === 0)) {
        this.isLoading = true
        const loading = useLoadingStore()
        loading.updateShowLoadingSpinner(true)
        locationService.getLocationList()
          .then((result) => this.locationList = result)
          .catch((error) => {
            console.error(error)
            toast("Kommunikationsfehler", {
              description: error.message,
              cardProps: {
                color: 'error',
              }
            })
          })
          .finally(() => {
            loading.updateShowLoadingSpinner(false)
            this.isLoading = false
          })
      }
    }
  }
})
