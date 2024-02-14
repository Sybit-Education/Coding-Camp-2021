import { defineStore } from "pinia"
import targetService from '@/services/target.service'
import type Target from "@/types/target"
import { useLoadingStore } from "./loading.store"
import { toast } from 'vuetify-sonner'

interface State {
  targetList: Array<Target>
  isLoading: boolean
}

export const useTargetStore = defineStore("target", {
  state: (): State =>  ({
    targetList: Array<Target>(),
    isLoading: false
  }),
  getters: {
    getTargetList: (state) => state.targetList as Array<Target>,
    getTargetById: (state) => (id: string) =>  state.targetList.find((target) => target.id === id) as Target
  },
  actions: {
    async getTargetRecords () {
      if (!this.isLoading && (!this.getTargetList || this.getTargetList.length === 0)) {
        this.isLoading = true
        const loading = useLoadingStore()
        loading.updateShowLoadingSpinner(true)
        targetService.getTargetRecords()
          .then((result) => this.targetList = result)
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
