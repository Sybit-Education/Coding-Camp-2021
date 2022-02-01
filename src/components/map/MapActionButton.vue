<template>
  <div class="map-action-button">
    <v-btn class="map-action-button__btn" fab @click="showUploadForm = true">
      <v-icon size="30" title="Hinzufügen">mdi-plus</v-icon>
    </v-btn>
    <map-upload-form :userLocation="userLocation" />
  </div>
</template>

<script>
import MapUploadForm from './MapUploadForm'

export default {
  name: 'MapActionButton',
  components: { MapUploadForm },
  data () {
    return {
      showUploadForm: false
    }
  },
  props: {
    userLocation: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.map-action-button__btn {
  width: 40px;
  height: 40px;
  @include glassmorphism(
    $color: white,
    $blur-ammount: 4px,
    $color-intensity: 0.4
  );
}
</style>
