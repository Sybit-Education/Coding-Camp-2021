<template>
  <v-card class="rounded-xl text-center py-3 grey lighten-3" to="/">
    <div class="text-h4 font-weight-black">
      <number :to="count" :duration="5" />
    </div>
    <div class="text-caption">Materialien</div>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MaterialMetricCard',
  computed: {
    ...mapGetters({
      getMaterialList: 'Material/getMaterialList'
    }),
    count () {
      return this.getMaterialList.length
    }
  }
}
</script>

<style>
</style>
