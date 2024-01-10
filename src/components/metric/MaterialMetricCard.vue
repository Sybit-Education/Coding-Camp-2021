<template>
  <v-card
    class="rounded-xl text-center py-3 bg-grey-lighten-3"
    to="/"
  >
    <div class="text-h4 font-weight-black">
      <number-animation
        :to="count"
        :duration="5"
        :format="format"
      />
    </div>
    <div class="text-caption">
      Materialien
    </div>
  </v-card>
</template>

<script lang="ts">
import NumberAnimation from "vue-number-animation"
import { mapState } from 'pinia'
import { useMaterialStore } from '@/store/material.store'

export default {
  components: {
    NumberAnimation
  },
  computed: {
    ...mapState(useMaterialStore, {
      count: store =>  store.materialList.length
    })
  },
  methods: {
    format (value: number) {
      return value.toFixed(0)
    }
  }
}
</script>

