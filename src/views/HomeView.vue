<template>
  <v-container>
    <h1 class="search-title">
      Wie entsorge ich im Landkreis Konstanz &hellip;
    </h1>
    <material-searchbar :items="materialList" class="my-10" />

    <v-row class="metrics">
      <v-col><material-metric-card /></v-col>
      <v-col><location-metric-card /></v-col>
      <v-col><tipp-metric-card /></v-col>
    </v-row>

    <tip-card v-if="tip && tip.id" :tip="tip" />
    <v-skeleton-loader v-else type="card" />

    <h2>Unsere Partner</h2>
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

import { mapGetters } from 'vuex'

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
    tip () {
      return this.tipList[Math.floor(Math.random() * this.tipList.length)]
    },
    ...mapGetters({
      materialList: 'Material/getMaterialList',
      tipList: 'Tip/getTipList'
    })
  }
}
</script>
<style lang="scss">
.search-title {
  word-break: normal;
}
</style>
