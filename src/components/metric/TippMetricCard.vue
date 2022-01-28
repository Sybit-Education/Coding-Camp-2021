import { mapGetters } from 'vuex';
<template>
  <v-card class="rounded-xl text-center py-3 grey lighten-3" to="/tipps">
    <div class="text-h4 font-weight-black">
      <number :to="count" :duration="1" />
    </div>
    <div class="text-caption">Tipps</div>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TippMetricCard',
  computed: {
    count () {
      return this.getTipList.length
    },
    ...mapGetters({
      getTipList: 'Tip/getTipList'
    })
  }
}
</script>

<style>
</style>
