<template>
  <v-container class="home__container">
    <h1 class="mt-5">Wie entsorge ich im Landkreis Konstanz &hellip;</h1>
    <Searchbar :items="materials"/>
  </v-container>
</template>

<script>
import Searchbar from '../components/searchbar/Searchbar'
export default {
  name: 'Home',
  components: {
    Searchbar
  },
  metaInfo () {
    return {
    }
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
  },
  methods: {
  }
}
</script>
<style scoped>
.home__container {
  position: relative;
  text-align: center;
}
</style>
