<template>
  <v-container id="tip-list" class="pb-16">
    <h1 class="mb-5">Tipps</h1>
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
  name: 'tips',
  components: { tipCard },
  data () {
    return {
      list: []
    }
  },
  async created () {
    this.list = await this.$store.dispatch('getTipRecords')
  }
}
</script>
