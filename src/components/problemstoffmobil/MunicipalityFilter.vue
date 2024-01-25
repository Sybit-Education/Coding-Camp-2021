<template>
  <div clasee="municipality-filter">
    <v-autocomplete
      v-model="select"
      :loading="municipalities && municipalities.length < 0"
      :items="municipalities"
      :search="search"
      class="municipality-filter__autocomplete rounded-xl"
      hide-no-data
      hide-details
      label="Gemeinde auswählen"
      variant="solo"
      auto-select-first
    />
  </div>
</template>

<script lang="ts">
import type Event from '@/types/event'

export default {

  name: 'MunicipalityFilter',
  props: {
    eventList: {
      type: Array<Event>,
      required: true
    }
  },
  emits: ['doFilter'],
  data () {
    return {
      search: undefined as string | undefined,
      select: undefined as string | undefined
    }
  },
  computed: {
    municipalities () {
      const muni = this.eventList.map((event: Event) => event.municipality)
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
