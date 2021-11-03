<template>
  <v-toolbar>
    <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      class="mx-4 rounded-xl"
      flat
      outlined
      no-data-text="Keine Treffer!"
      hide-details
      label="Suche deinen Müll..."
      :filter="filterObject"
    >
      <template slot="item" slot-scope="data">
        {{ data.item.name }}
      </template>
      <template slot="selection" slot-scope="data">
        {{ data.item.name }}
      </template>
      <template v-slot:append>
        <v-icon>
          {{ $route.path === "/detail" ? "mdi-magnify" : "mdi-help" }}
        </v-icon>
      </template>
    </v-autocomplete>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      search: null,
      select: null
    }
  },
  methods: {
    filterObject (item, queryText) {
      if (item.synonyms) {
        return (
          item.name.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
            -1 ||
          item.synonyms
            .toLocaleLowerCase()
            .indexOf(queryText.toLocaleLowerCase()) > -1
        )
      } else {
        return (
          item.name.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
          -1
        )
      }
    }
  }
}
</script>

<style>
.v-sheet.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: none !important;
}
</style>
