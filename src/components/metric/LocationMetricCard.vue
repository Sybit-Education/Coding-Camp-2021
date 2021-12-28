<template>
  <v-card class="rounded-xl text-center py-3 orange lighten-3">
    <div class="text-h4 font-weight-black">
      <number :to="count" :duration="5" />
    </div>
    <div class="text-caption">Karteneinträge</div>
  </v-card>
</template>

<script>
export default {
  name: 'LocationMetricCard',
  data () {
    return {
      count: 0
    }
  },
  mounted () {
    this.$store.dispatch('getTrashCansFromSessionStorage').then(() => {
      const list = this.$store.getters.getTrashCans
      this.count = list.length
    })
  }
}
</script>

<style>
</style>
