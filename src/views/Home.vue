<template>
  <v-container>
    <div class="d-flex justify-center">
      <h1 class="mt-5">Wie entsorge ich im Landkreis Konstanz &hellip;</h1>
    </div>
    <Searchbar :items="materials" />
    <Partner class="mt-15"/>
  </v-container>
</template>

<script>
import Searchbar from '../components/searchbar/Searchbar'
import Partner from '../components/partner/Partner'
export default {
  name: 'Home',
  components: {
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
  },
  methods: {}
}
</script>
