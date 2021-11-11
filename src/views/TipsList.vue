<template>
  <v-container id="tip-list">
    <h1 class="mb-5">Tipps</h1>
    <loading-spinner v-if="showLoadingSpinner"></loading-spinner>
    <div v-for="tip in list" :key="tip.id">
      <tip-card :tip="tip" class="mb-5"/>
    </div>
    <br>
    <br>
  </v-container>
</template>

<script>
import tipCard from '@/components/tips/TipCard.vue'

export default {
  name: 'Tipps',
  components: { tipCard },
  data () {
    return {
      list: [],
      showLoadingSpinner: true
    }
  },
  metaInfo () {
    return {
      title: 'Tipps'
    }
  },
  async created () {
    this.list = await this.$store.dispatch('getTipRecords')
    this.showLoadingSpinner = false
  }
}
</script>
