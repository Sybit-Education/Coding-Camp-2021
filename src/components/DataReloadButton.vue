<template>
  <v-btn @click="reload">Daten neu laden</v-btn>
</template>

<script>
export default {
  name: 'DataReloadButton',
  methods: {
    reload () {
      window.sessionStorage.clear()

      this.$store.dispatch('Material/getMaterialRecords')
      this.$store.dispatch('Target/getTargetRecords')
      this.$store.dispatch('Tip/getTipRecords')
      this.$store.dispatch('Location/getLocationRecords')
    }
  }
}
</script>
