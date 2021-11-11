<template>
  <v-toolbar>
    <v-autocomplete
        v-model="select"
        :loading="items && items.length < 0"
        :items="items"
        class="rounded-xl"
        solo
        no-data-text="Keine Treffer!"
        hide-details
        label="Tippe zum Suchen"
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
  watch: {
    select () {
      this.search()
    }
  },
  data () {
    return {
      select: null
    }
  },
  methods: {
    search () {
      if (this.select?.id) {
        this.$router.push({ name: 'DetailPage', params: { id: this.select.id } })
      }
    },
    filterObject: function (item, queryText) {
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
<style scoped>
.v-sheet.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: none !important;
}
</style>
