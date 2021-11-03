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
      hide-no-data
      hide-details
      label="Suche deinen Müll..."
    >
    <template slot="item" slot-scope="data">
      {{data.item.name}}
    </template>
    <template slot="selection" slot-scope="data">
      {{data.item.name}}
    </template>
    <template v-slot:append>
      <v-icon>
        {{ $route.path === '/detail' ? 'mdi-magnify' : 'mdi-help'}}
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
  watch: {
    search (val) {
      val && val !== this.select && this.querySelections(val)
    }
  }
}
</script>

<style>

.v-sheet.v-toolbar:not(.v-sheet--outlined) {
    box-shadow: none !important;
}

</style>
