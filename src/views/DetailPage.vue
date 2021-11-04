<template>
  <v-container>
    <div class="d-flex justify-center mb-7">
    <h1 style="font-size:40px">{{material.name}}</h1>
    </div>
    <v-img contain height="125"  class="mb-10" :src="image"></v-img>
    <p class="mx-5 black--text" align="center" style="font-size:26px"> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. </p>
  </v-container>

</template>
<script>
export default {
  computed: {
    image () {
      if (this.material?.targets[0]?.images) {
        return this.material.targets[0].images[0].url
      }
      return ('https://via.placeholder.com/150?text=placeholder')
    },
    material () {
      return this.$store.getters.getMaterialById(this.$route.params.id)
    }
  },
  mounted () {
    this.getMaterial()
    this.isShareable()
  },
  methods: {
    getMaterial () {
      if (this.material === !undefined) return
      this.$store.dispatch('getRecordsFromSessionStorage', [
        'material',
        'targets'
      ])
    }
  },
  isShareable () {
    return (this.material && ('share' in navigator))
  },
  shareDetails () {
    if (!this.isShareable) {
      return
    }
    const { GEN: districtName, BEZ: districtCategory, cases7_per_100k: incidence, last_update: today } = this.data
    const data = {
      title: 'Hier findet du Details zu dem',
      text: `Mehr Informationen auf Mülli:
        In ${districtName} (${districtCategory}) wurden in den letzten 7 Tagen
        ${this.rounded(incidence)} ${this.indicatorEmoji} Menschen
        von 100.000 Einwohnern positiv auf 🦠 COVID-19 getestet (${today}):`,
      url: window.location.href
    }
    navigator.share(data)
  }
}
</script>
