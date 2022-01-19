<template>
  <location-map :navigate="false" :location-type="targetNames" />
</template>
<script>
import LocationMap from '@/components/map/LocationMap.vue'

export default {
  name: 'MapView',
  components: {
    LocationMap
  },
  props: {
    targetNames: {
      type: Array,
      default: null
    }
  },
  metaInfo () {
    return {
      title: 'Karte mit Entsorgungsmöglichkeiten'
    }
  }
}
</script>
