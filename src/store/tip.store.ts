import { defineStore } from "pinia"
import tipService from '@/services/tip.service'
import { useLoadingStore } from "@/store/loading.store"
import type Tip from "@/types/tip"
import { toast } from 'vuetify-sonner'

interface State {
  tipList: Array<Tip>
  isLoading: boolean
}

export const useTipStore = defineStore("tip", {
  state: (): State =>  ({
    tipList: Array<Tip>(),
    isLoading: false
  }),
  getters: {
    getTipList:  (state) => state.tipList as Array<Tip>,
    getTipById: (state) => (id: string) => state.tipList.find((tip) => tip.id === id) as Tip,
    getRandomeTip: (state) => state.tipList[Math.floor(Math.random() * state.tipList.length)] as Tip
  },
  actions: {
    getTipRecords () {
      if (!this.isLoading && (!this.getTipList || this.getTipList.length === 0)) {
        this.isLoading = true
        const loading = useLoadingStore()
        loading.updateShowLoadingSpinner(true)
        tipService.getTipRecords()
          .then((result) => this.tipList = result)
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
