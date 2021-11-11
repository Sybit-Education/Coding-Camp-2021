<template>
  <span>
    <h3>Tipps</h3>
    <v-carousel
        v-if="tipList.length"
        cycle
        max-width="320"
        max-height="200"
        hide-delimiter-background
        hide-delimiters
        :show-arrows="false"
    >
      <v-carousel-item v-for="tip in tipList" :key="tip.id">
        <v-row>
          <v-col>
            <tip-card :tip="tip"/>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <v-skeleton-loader v-else type="card" />
  </span>
</template>

<script>
import TipCard from './TipCard'

export default {
  name: 'TipCarousel',
  components: { TipCard },
  data () {
    return {
      tipList: []
    }
  },
  async created () {
    this.tipList = await this.$store.dispatch('getTipRecords')
  }
}
</script>
