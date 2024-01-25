<template>
  <v-btn @click="reload">
    Daten neu laden
  </v-btn>
</template>

<script lang="ts">
import { useMaterialStore } from '@/store/material.store'
import { useTargetStore } from '@/store/target.store'
import { useTipStore } from '@/store/tip.store'
import { useLocationStore } from '@/store/location.store'

export default {
  methods: {
    reload () {
      window.sessionStorage.clear()

      useMaterialStore().getMaterialRecords()
      useTargetStore().getTargetRecords()
      useTipStore().getTipRecords()
      useLocationStore().getLocationRecords()
    }
  }
}
</script>
