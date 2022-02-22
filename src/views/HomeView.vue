<template>
  <v-container>
    <div class="search">
      <h1 class="search__title">
        Wie entsorge ich im Landkreis Konstanz &hellip;
      </h1>
      <material-searchbar :items="materialList" class="search__input my-10" />
    </div>

    <v-row class="metrics" class="my-10">
      <v-col><material-metric-card /></v-col>
      <v-col><location-metric-card /></v-col>
      <v-col><tipp-metric-card /></v-col>
    </v-row>

    <div class="my-10">
      <tip-card v-if="tip && tip.id" :tip="tip" />
      <v-skeleton-loader v-else type="card" />
    </div>
    <div class="my-10">
      <h2>Unsere Partner</h2>
      <partner-carousel />
    </div>
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
.search {
  @include glassmorphism(
    $color: white,
    $blur-ammount: 8px,
    $color-intensity: 0.4
  );
  &__title {
    word-break: normal;
    min-height: 1.5rem;
  }
  &__input {
    z-index: 1020;
    position: sticky;
    top: 0;
  }
}
</style>
