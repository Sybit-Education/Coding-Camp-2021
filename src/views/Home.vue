<template>
  <v-container>
    <h1 class="search-title">
      Wie entsorge ich im Landkreis Konstanz &hellip;
    </h1>
    <searchbar :items="materials" class="my-5" />
    <tip-card v-if="tip && tip.id" :tip="tip" />
    <v-skeleton-loader v-else type="card" />
    <partner-carousel />
  </v-container>
</template>

<script>
import Searchbar from '@/components/searchbar/Searchbar'
import PartnerCarousel from '@/components/partner/PartnerCarousel'
import TipCard from '@/components/tips/TipCard'

export default {
  name: 'Home',
  components: {
    TipCard,
    Searchbar,
    PartnerCarousel
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
