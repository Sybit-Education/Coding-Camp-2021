<template>
  <Map :navigate="false" :trashCanType="targetNames"/>
</template>

<script>
import Map from '@/components/map/Map.vue'

export default {
  components: {
    Map
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
