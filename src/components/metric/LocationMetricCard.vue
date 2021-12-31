<template>
  <v-card class="rounded-xl text-center py-3 grey lighten-3" to="/karte">
    <div class="text-h4 font-weight-black">
      <number :to="count" :duration="5" />
    </div>
    <div class="text-caption">Karteneinträge</div>
  </v-card>
</template>

<script>
import * as trashcanService from '@/services/trashcan.service'
export default {
  name: 'LocationMetricCard',
  data () {
    return {
      count: 0
    }
  },
  mounted () {
    trashcanService.getTrashCans().then((list) => {
      this.count = list.length
    })
  }
}
</script>

<style>
</style>
