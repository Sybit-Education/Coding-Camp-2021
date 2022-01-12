<template>
  <v-container>
    <h1 class="search-title">
      Wie entsorge ich im Landkreis Konstanz &hellip;
    </h1>
    <material-searchbar :items="materials" class="my-5" />
    <v-row class="metrics">
      <v-col><material-metric-card /></v-col>
      <v-col><location-metric-card /></v-col>
      <v-col><tipp-metric-card /></v-col>
    </v-row>
    <tip-card v-if="tip && tip.id" :tip="tip" />
    <v-skeleton-loader v-else type="card" />
    <partner-carousel />
  </v-container>
</template>

<script>
import MaterialSearchbar from '@/components/searchbar/MaterialSearchbar'
import PartnerCarousel from '@/components/partner/PartnerCarousel'
import TipCard from '@/components/tips/TipCard'
import MaterialMetricCard from '@/components/metric/MaterialMetricCard.vue'
import LocationMetricCard from '@/components/metric/LocationMetricCard.vue'
import TippMetricCard from '@/components/metric/TippMetricCard.vue'

export default {
  name: 'HomeView',
  components: {
    TipCard,
    MaterialSearchbar,
    PartnerCarousel,
    MaterialMetricCard,
    LocationMetricCard,
    TippMetricCard
  },
  metaInfo () {
    return {}
  },
  computed: {
    materials () {
      return this.$store.getters.getMaterialList
    },
    tip () {
      const tipList = this.$store.getters.getTipList
      return tipList[Math.floor(Math.random() * tipList.length)]
    }
  }
}
</script>
<style lang="scss">
.search-title {
  word-break: normal;
}
</style>
