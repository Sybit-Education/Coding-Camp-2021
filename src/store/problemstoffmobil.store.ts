import { defineStore } from "pinia"
import problemstoffmobilService from '@/services/problemstoffmobil.service'
import { useLoadingStore } from "./loading.store"
import type Event from "@/types/event"
import { toast } from 'vuetify-sonner'

interface State {
  eventList: Array<Event>
  isLoading: boolean
}

export const useEventStore = defineStore("event", {
  state: (): State =>  ({
      eventList: Array<Event>(),
      isLoading: false
  }),
  getters: {
    getEventList: (state) => state.eventList,
    getEventById: (state) => (id: string) =>  state.eventList.find((event) => event.id === id)
  },
  actions: {
    async getEventRecords () {
      if (!this.isLoading && (!this.getEventList || this.getEventList.length === 0)) {
        this.isLoading = true
        const loading = useLoadingStore()
        loading.updateShowLoadingSpinner(true)
        problemstoffmobilService.getEventRecords()
          .then((result) => this.eventList = result)
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
