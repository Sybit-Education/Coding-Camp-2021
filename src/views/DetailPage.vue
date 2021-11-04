<template>
  <v-container>
    <div v-if="material && material.name && image">
          <div class="d-flex justify-center mb-7">
    <h1 style="font-size:40px">{{material.name}}</h1>
    </div>
    <v-img contain height="125"  class="mb-10" :src="image"></v-img>
    <p class="mx-5 black--text" align="center" style="font-size:26px">{{ material.notes }}</p>
    </div>
    <v-skeleton-loader v-else type="card" />
  </v-container>

</template>
<script>
export default {
  computed: {
    image () {
      if (this.material?.targets[0]?.images) {
        return this.material.targets[0].images[0].url
      }
      return 'https://via.placeholder.com/150?text=placeholder'
    },
    material () {
      return this.$store.getters.getMaterialById(this.$route.params.id)
    },
    isShareable () {
      return (this.material && ('share' in navigator))
    }
  },
  mounted () {
    this.getMaterial()
  },
  methods: {
    getMaterial () {
      if (this.material === !undefined) return
      this.$store.dispatch('getRecordsFromSessionStorage', [
        'material',
        'targets'
      ])
    },
    shareDetails () {
      if (!this.isShareable) {
        return
      }
      const { GEN: name, BEZ: targets } = this.material
      const data = {
        title: `Details zu ${name}`,
        text: `So kannst du den Müll fachgerecht entsorgen:
        (${targets[0].description})`,
        url: window.location.href
      }
      navigator.share(data)
    }
  }
}
</script>
