<template>
  <v-container>
    <h1 class="mt-5 d-flex justify-center">Wie entsorge ich im Landkreis Konstanz &hellip;</h1>
    <Searchbar :items="materials" />
    <Partner class="mt-15"/>
  </v-container>
</template>

<script>
import Searchbar from "../components/searchbar/Searchbar";
import Partner from "../components/partner/Partner";
export default {
  name: "Home",
  components: {
    Searchbar,
    Partner,
  },
  metaInfo() {
    return {};
  },
  computed: {
    materials() {
      return this.$store.getters.getMaterialList;
    },
  },
  mounted() {
    if (this.materials) {
      this.$store.dispatch("getRecordsFromSessionStorage", [
        "material",
        "targets",
      ]);
    }
  },
  methods: {},
};
</script>