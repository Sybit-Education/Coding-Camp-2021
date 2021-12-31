<template>
  <v-card class="rounded-xl text-center py-3 grey lighten-3" to="/tipps">
    <div class="text-h4 font-weight-black">
      <number :to="count" :duration="1" />
    </div>
    <div class="text-caption">Tipps</div>
  </v-card>
</template>

<script>
import tipService from '@/services/tip.service'

export default {
  name: 'TippMetricCard',
  data () {
    return {
      count: 0
    }
  },
  mounted () {
    tipService.getTipRecords().then((list) => {
      this.count = list.length
    })
  }
}
</script>

<style>
</style>
