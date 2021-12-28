<template>
  <div>
    <v-btn
      bottom
      right
      class="map__action-button"
      fab
      fixed
      @click="showUploadForm = true"
    >
      <v-icon size="35">mdi-plus</v-icon>
    </v-btn>
    <MapUploadForm :userLocation="userLocation"></MapUploadForm>
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
@import "src/scss/variables.scss";

.map__action-button {
  @include glassmorphism(
    $color: white,
    $blur-ammount: 4px,
    $color-intensity: 0.4
  );
  margin-bottom: calc(0.5 * #{$bottom-navigation-height});

  @media #{map-get($display-breakpoints, 'xs-only')} {
    margin-bottom: calc(1.5 * #{$bottom-navigation-height});
  }
}
</style>
