<template>
  <v-bottom-navigation app color="primary" hide-on-scroll>
    <v-btn :to="{ name: 'Home' }" class="bottom-nav__button rounded-xl" exact>
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn :to="{ name: 'Tipps' }" class="bottom-nav__button rounded-xl" exact>
      <span>Tipps</span>
      <v-icon>mdi-lightbulb-on</v-icon>
    </v-btn>
    <v-btn :to="{ name: 'Karte' }" class="bottom-nav__button rounded-xl" exact>
      <span>Karte</span>
      <v-icon>mdi-google-maps</v-icon>
    </v-btn>
    <v-menu offset-y top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="bottom-nav__button rounded-xl" v-bind="attrs" v-on="on">
          <span class="grey--text text--darken-2">Menu</span>
          <v-icon color="grey darken-2">mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list class="d-flex flex-column pa-2">
        <v-btn class="my-2 grey--text text--darken-2" :to="{ name: 'Impressum' }" exact text>
          <span>Impressum</span>
        </v-btn>
        <v-btn class="my-2 grey--text text--darken-2" :to="{ name: 'Datenschutz' }" exact text>
          <span>Datenschutz</span>
        </v-btn>
        <v-btn class="my-2 grey--text text--darken-2" :to="{ name: 'Ueber-uns' }" exact text>
          <span>Über uns</span>
        </v-btn>
      </v-list>
    </v-menu>
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
  @include glassmorphism(
    $color: white,
    $blur-ammount: 8px,
    $color-intensity: 0.4
  );
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

.theme--light.v-btn {
  color: rgba(255, 111, 0, 0.87);
}
</style>
