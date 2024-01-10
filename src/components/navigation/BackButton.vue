<template>
  <v-btn
    size="small"
    location="top left"
    icon="mdi-arrow-left"
    fixed
    class="back-button mt-3"
    @click="$router.back()"
  />
</template>

<script lang="ts">
export default {
  name: 'BackButton'
}
</script>

<style lang="scss" scoped>
@use 'vuetify/settings' as v;
.back-button {
  @include glassmorphism(
    $color: white,
    $blur-ammount: 4px,
    $color-intensity: 0.4
  );
  z-index: 999;
  --margin-bottom: calc(0.5 * #{$bottom-navigation-height});

  @media #{map-get(v.$display-breakpoints, 'xs')} {
    --margin-bottom: calc(1.5 * #{$bottom-navigation-height});
  }
}

.theme--light.v-btn--active::before {
  opacity: 0;
}
</style>
