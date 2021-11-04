<template>
  <v-container>
    <v-row>
      <v-col align="center" cols="12">
        <h1>Wie entsorge ich im Landkreis Konstanz &hellip;</h1>
      </v-col>
      <v-col>
        <Searchbar :items="materials"/>
        <Partner class="mt-15"/>
      </v-col>
    </v-row>
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
