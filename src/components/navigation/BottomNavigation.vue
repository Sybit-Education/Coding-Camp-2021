<template>
  <v-bottom-navigation
    class="bottom-nav"
    color="primary"
  >
    <v-btn
      :to="{ name: 'Home' }"
      class="bottom-nav__button rounded-xl"
      exact
    >
      <v-icon>mdi-home</v-icon>
      <span>Home</span>
    </v-btn>
    <v-btn
      :to="{ name: 'Tipps' }"
      class="bottom-nav__button rounded-xl"
      exact
    >
      <v-icon>mdi-lightbulb-on</v-icon>
      <span>Tipps</span>
    </v-btn>
    <v-btn
      :to="{ name: 'Karte' }"
      class="bottom-nav__button rounded-xl"
      exact
    >
      <v-icon>mdi-google-maps</v-icon>
      <span>Karte</span>
    </v-btn>
    <v-menu
      location="top"
      transition="slide-y-transition"
    >
      <template #activator="{ props }">
        <v-btn
          class="bottom-nav__button rounded-xl"
          v-bind="props"
        >
          <v-icon color="grey-darken-2">
            mdi-dots-horizontal
          </v-icon>
          <span class="text-grey-darken-2">Mehr</span>
        </v-btn>
      </template>
      <v-list class="bottom-nav__menu">
        <v-list-item
          :to="{ name: 'Impressum' }"
          class="px-7"
        >
          <v-list-item-title>Impressum</v-list-item-title>
        </v-list-item>
        <v-list-item
          :to="{ name: 'Datenschutz' }"
          class="px-7"
        >
          <v-list-item-title>Datenschutz</v-list-item-title>
        </v-list-item>
        <v-list-item
          :to="{ name: 'Press' }"
          class="px-7"
        >
          <v-list-item-title>Presse</v-list-item-title>
        </v-list-item>
        <v-list-item
          :to="{ name: 'Ueber-uns' }"
          class="px-7"
        >
          <v-list-item-title>Über uns</v-list-item-title>
        </v-list-item>
        <v-list-item
          :to="{ name: 'Partner' }"
          class="px-7"
        >
          <v-list-item-title>Partner</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-bottom-navigation>
</template>

<script setup lang="ts">
  //
</script>

<style lang="scss">
.v-bottom-navigation.v-bottom-navigation__content {
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
  @include glassmorphism(
    $color: white,
    $blur-ammount: 8px,
    $color-intensity: 0.4
  );
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
</style>
