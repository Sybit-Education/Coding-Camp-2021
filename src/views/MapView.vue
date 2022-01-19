<template>
  <location-map :navigate="false" :trash-can-type="targetNames" />
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
