<template>
  <v-card
    class="rounded-xl text-center py-3 bg-grey-lighten-3"
    to="/karte"
  >
    <div class="text-h4 font-weight-black">
      <number-animation
        :to="count"
        :duration="5"
        :format="format"
      />
    </div>
    <div class="text-caption">
      Karteneinträge
    </div>
  </v-card>
</template>

<script lang="ts">
import NumberAnimation from "vue-number-animation"
import { mapState } from 'pinia'
import { useLocationStore } from '@/store/location.store'

export default {
  components: {
    NumberAnimation
  },
  computed: {
    ...mapState(useLocationStore, {
      count: store =>  store.locationList.length
    })
  },
  methods: {
    format (value: number) {
      return value.toFixed(0)
    }
  }
}
</script>
