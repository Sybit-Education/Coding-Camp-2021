<template>
  <location-map
    :navigate="false"
    :location-type="targetNames"
  />
</template>
<script lang="ts">
import LocationMap from '@/components/map/LocationMap.vue'

export default {
  components: {
    LocationMap
  },
  props: {
    targetNames: {
      type: Array,
      default: null
    }
  },
  head: {
    title: 'Karte mit Entsorgungsmöglichkeiten'
  }
}
</script>
