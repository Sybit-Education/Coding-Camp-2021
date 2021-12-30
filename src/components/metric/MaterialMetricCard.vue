<template>
  <v-card class="rounded-xl text-center py-3 grey lighten-3" to="/">
    <div class="text-h4 font-weight-black">
      <number :to="count" :duration="5" />
    </div>
    <div class="text-caption">Materialien</div>
  </v-card>
</template>

<script>
import materialService from '@/services/material.service'
export default {
  name: 'MaterialMetricCard',
  data () {
    return {
      count: 0
    }
  },
  mounted () {
    materialService.getMaterialRecords().then((list) => {
      this.count = list.length
    })
  }
}
</script>

<style>
</style>
