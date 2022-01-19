<template>
  <div>
    <v-btn
      v-if="showThrowButton"
      block
      class="rounded-xl py-7"
      color="blue"
      dark
      elevation="0"
      @click="routeToMap"
    >
      Jetzt entsorgen &hellip;
    </v-btn>
    <v-btn
      v-if="showForwardButton"
      block
      class="rounded-xl py-7"
      color="blue"
      dark
      elevation="0"
      @click="routeToDRK"
    >
      Container beim
      <v-icon color="red" size="30">mdi-hospital</v-icon>DRK suchen
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'MaterialCallToActionButton',
  props: {
    material: {
      type: Object,
      required: true
    }
  },
  computed: {
    showButton () {
      return this.material.status === 'available'
    },
    showThrowButton () {
      return !!this.material.targets.some(
        (target) => target.targetAction === 'show'
      )
    },
    showForwardButton () {
      return !!this.material.targets.some(
        (target) => target.targetAction === 'URL_forwarding'
      )
    }
  },
  methods: {
    routeToDRK () {
      window.location.href =
        'https://www.drk-intern.de/start/suchergebnisse/kleidercontainer-suchergebnis.html?tx_drkclothescontainersearch_clothescontainersearch%5Baction%5D=clothescontainerResult&tx_drkclothescontainersearch_clothescontainersearch%5Bcontroller%5D=Clothescontainer&cHash=7ff3b10ad9ccdcf930f0dfa688ec8e20'
    },
    routeToMap () {
      const targetNames = this.material.targets.map((target) => target.name)
      this.$router.push({
        name: 'Karte',
        params: { targetNames: targetNames }
      })
    }
  }
}
</script>

<style>
</style>
