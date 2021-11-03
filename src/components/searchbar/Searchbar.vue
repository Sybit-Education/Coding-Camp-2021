<template>
  <v-toolbar>
    <v-toolbar-title>Dein Müll</v-toolbar-title>
    <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      class="mx-4"
      flat
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
    </v-autocomplete>
    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
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
  .v-toolbar__content, .v-toolbar__extension {
      align-items: center;
      display: flex;
      position: relative;
      z-index: 0;
      background: rgb(255, 255, 255);
      border-radius: 52px;
      width: 1190px;
      margin: auto;
  }

.v-sheet.v-toolbar:not(.v-sheet--outlined) {
    box-shadow: none !important;
}

</style>
