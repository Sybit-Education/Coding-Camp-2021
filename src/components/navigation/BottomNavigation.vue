<template>
  <v-bottom-navigation app color="pink accent-3" hide-on-scroll scroll-target="#scroll-area">
    <v-btn :to="{ name: 'Home' }" class="bottom-nav__button rounded-xl" exact>
      <span>Home</span>
      <v-icon>mdi-home-variant</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data () {
    return {
      locationMap: {
        location_: 0,
        location_map: 1,
        location_more: 2
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-item-group.v-bottom-navigation {
  @include glassmorphism($color: white, $blur-ammount: 8px, $color-intensity: .4);
  display: flex;
  justify-content: space-around;
  border-radius: 50px;
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%) !important;
  max-width: 344px;
}

.bottom-nav {
  &__button {
    display: flex;
    justify-content: center;
    align-self: center;
    background-color: transparent !important;

    &.v-btn--active::before {
      opacity: 0 !important;
    }
  }
}
</style>
