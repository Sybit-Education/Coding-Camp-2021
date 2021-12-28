<template>
  <v-card class="rounded-xl text-center py-3 orange lighten-3">
    <div class="text-h4 font-weight-black">
      <number :to="count" :duration="5" />
    </div>
    <div class="text-caption">Materialien</div>
  </v-card>
</template>

<script>
export default {
  name: 'MaterialMetricCard',
  data () {
    return {
      count: 0
    }
  },
  mounted () {
    const list = this.$store.getters.getMaterialList
    this.count = list.length
  }
}
</script>

<style>
</style>
