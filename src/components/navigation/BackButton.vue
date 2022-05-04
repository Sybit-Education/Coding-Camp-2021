<template>
  <v-btn
    @click="$router.back()"
    fab
    small
    top
    left
    fixed
    class="back-button mt-3"
  >
    <v-icon style="font-size: 25px"> mdi-arrow-left </v-icon>
  </v-btn>
</template>
<script>
export default {
  name: 'BackButton'
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/variables.scss";
.back-button {
  @include glassmorphism(
    $color: white,
    $blur-ammount: 4px,
    $color-intensity: 0.4
  );
  z-index: 999;
  margin-bottom: calc(0.5 * #{$bottom-navigation-height});

  @media #{map-get($display-breakpoints, 'xs-only')} {
    margin-bottom: calc(1.5 * #{$bottom-navigation-height});
  }
}

.theme--light.v-btn--active::before {
  opacity: 0;
}
</style>
