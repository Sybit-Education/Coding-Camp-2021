<template>
  <div clasee="municipality-filter">
    <v-autocomplete
      v-model="select"
      :loading="municipalities && municipalities.length < 0"
      :items="municipalities"
      :search-input="search"
      class="municipality-filter__autocomplete rounded-xl"
      hide-no-data
      hide-details
      label="Gemeinde auswählen"
      solo
      auto-select-first
    ></v-autocomplete>
  </div>
</template>

<script>
export default {
  name: 'MunicipalityFilter',
  props: {
    eventList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      search: null,
      select: null
    }
  },
  computed: {
    municipalities () {
      const muni = this.eventList.map((event) => event.municipality)
      return [...new Set(muni)].sort()
    }
  },
  watch: {
    select (val) {
      this.$emit('doFilter', val)
    }
  }
}
</script>
