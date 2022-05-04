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
    <v-menu offset-y top rounded="xl" transition="slide-y-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="bottom-nav__button rounded-xl" v-bind="attrs" v-on="on">
          <span class="grey--text text--darken-2">Mehr</span>
          <v-icon color="grey darken-2">mdi-dots-horizontal</v-icon>
        </v-btn>
      </template>
      <v-list class="bottom-nav__menu">
        <v-list-item :to="{ name: 'Impressum' }" class="px-7">
          <v-list-item-title>Impressum</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{ name: 'Datenschutz' }" class="px-7">
          <v-list-item-title>Datenschutz</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{ name: 'Press' }" class="px-7">
          <v-list-item-title>Presse</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{ name: 'Ueber-uns' }" class="px-7">
          <v-list-item-title>Über uns</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{ name: 'Partner' }" class="px-7">
          <v-list-item-title>Partner</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'BottomNavigation'
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
  padding-bottom: env(safe-area-inset-bottom);

  &__button {
    display: flex;
    justify-content: center;
    align-self: center;
    background-color: transparent !important;

    &.v-btn--active::before {
      opacity: 0 !important;
    }
  }
  &__menu {
    @include glassmorphism(
      $color: white,
      $blur-ammount: 8px,
      $color-intensity: 0.4
    );
  }
}

.theme--light {
  .v-btn {
    color: rgba(255, 111, 0, 0.87);
  }
}
</style>
