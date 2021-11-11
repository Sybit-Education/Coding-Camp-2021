<template>
  <v-container>
    <h1>Wie entsorge ich im Landkreis Konstanz &hellip;</h1>
    <searchbar :items="materials" class="my-5"/>
    <tip-carousel />
    <partner />
  </v-container>
</template>

<script>
import Searchbar from '../components/searchbar/Searchbar'
import Partner from '../components/partner/Partner'
import TipCarousel from '../components/tips/Carousel'

export default {
  name: 'Home',
  components: {
    TipCarousel,
    Searchbar,
    Partner
  },
  metaInfo () {
    return {}
  },
  computed: {
    materials () {
      return this.$store.getters.getMaterialList
    }
  },
  mounted () {
    if (this.materials) {
      this.$store.dispatch('getRecordsFromSessionStorage', [
        'material',
        'targets'
      ])
    }
  }
}
</script>
