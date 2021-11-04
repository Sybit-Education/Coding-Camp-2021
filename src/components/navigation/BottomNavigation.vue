<template>
  <v-bottom-navigation app color="amber darken-4" hide-on-scroll scroll-target="#scroll-area">
    <v-btn :to="{ name: 'Home' }" class="bottom-nav__button rounded-xl" exact>
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>
     <v-btn :to="{ name: 'Tipps' }" class="bottom-nav__button rounded-xl" exact>
      <span>Tipps</span>
      <v-icon>mdi-exclamation</v-icon>
    </v-btn>
     <v-menu offset-y top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="bottom-nav__button rounded-xl"
          v-bind="attrs"
          v-on="on"
        >
          <span class="black--text">Menu</span>
          <v-icon color="black">mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>Datenschutz</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Impressum</v-list-item-title>
        </v-list-item>
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
