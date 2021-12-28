<template>
  <v-card class="rounded-xl text-center py-3 orange lighten-3">
    <div class="text-h4 font-weight-black">
      <number :to="count" :duration="1" />
    </div>
    <div class="text-caption">Partner</div>
  </v-card>
</template>

<script>
import partnerService from '@/services/partner.service'

export default {
  name: 'PartnerMetricCard',
  data () {
    return {
      count: 0
    }
  },
  mounted () {
    partnerService.getPartnerRecords().then((list) => {
      console.log(list)
      this.count = list.length
    })
  }
}
</script>

<style>
</style>
