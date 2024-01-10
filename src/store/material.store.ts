import { defineStore } from "pinia"

import materialService from '@/services/material.service'
import type Material from "@/types/material"
import { useLoadingStore } from "@/store/loading.store"

interface State {
  materialList: Array<Material>
  isLoading: boolean
}

export const useMaterialStore = defineStore("material", {
  state: (): State =>  ({
      materialList: Array<Material>(),
      isLoading: false
  }),
  getters: {
    getMaterialList: (state) => state.materialList as Array<Material>,
    getMaterialByName: (state) => (name: string) => {
      name = name.toLowerCase()
      return state.materialList.find((material) => material.name.toLowerCase() === name) as Material
    },
    getMaterialById: (state) => (id: string) => state.materialList.find((material) => material.id === id) as Material,
    getMaterialListCount: (state) => state.materialList.length as Number
  },
  actions: {
    async getMaterialRecords () {
      if (!this.isLoading && this.getMaterialList.length === 0) {
        this.isLoading = true
        const loading = useLoadingStore()
        loading.updateShowLoadingSpinner(true)
        materialService.getMaterialRecords()
          .then((result) => this.materialList = result)
          .catch((error) => console.error(error))
          .finally(() => {
            loading.updateShowLoadingSpinner(false)
            this.isLoading = false
          })
      }
    }
  }
})
