<template>
  <v-card class="rounded-xl text-center py-3 grey lighten-3" to="/karte">
    <div class="text-h4 font-weight-black">
      <number :to="count" :duration="5" />
    </div>
    <div class="text-caption">Karteneinträge</div>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LocationMetricCard',

  computed: {
    ...mapGetters({
      getLocationList: 'Location/getLocationList'
    }),
    count () {
      return this.getLocationList.length
    }
  }
}
</script>

<style>
</style>
