<template>
  <v-container>
    <div class="search">
      <h1 class="search__title">
        Wie entsorge ich im Landkreis Konstanz &hellip;
      </h1>
      <material-searchbar
        :items="materialList"
        class="search__input my-10"
      />
    </div>

    <v-row class="metrics my-10">
      <v-col><material-metric-card /></v-col>
      <v-col><location-metric-card /></v-col>
      <v-col><tipp-metric-card /></v-col>
    </v-row>

    <div class="my-10">
      <tip-card
        v-if="tip && tip.id"
        :tip="tip"
      />
      <v-skeleton-loader
        v-else
        type="card"
      />
    </div>
    <div class="my-10">
      <h2>Unsere Partner</h2>
      <partner-carousel />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MaterialSearchbar from '@/components/searchbar/MaterialSearchbar.vue'
import PartnerCarousel from '@/components/partner/PartnerCarousel.vue'
import TipCard from '@/components/tips/TipCard.vue'
import MaterialMetricCard from '@/components/metric/MaterialMetricCard.vue'
import LocationMetricCard from '@/components/metric/LocationMetricCard.vue'
import TippMetricCard from '@/components/metric/TippMetricCard.vue'
import { useHead } from '@unhead/vue'
import { useMaterialStore } from '@/store/material.store'
import { useTipStore } from '@/store/tip.store'

useHead({
  title: 'Entsorgungswegweiser',
  meta: [
    {
      name: 'description',
      content: 'Wie entsorge ich im Landkreis Konstanz &hellip;'
    }
  ]
})
const tipStore = useTipStore()
const tip = computed(() => tipStore.getRandomeTip)
const matStore = useMaterialStore()
const materialList = computed(() => matStore.materialList)
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
