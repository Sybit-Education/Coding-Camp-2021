<template>
  <v-container class="tipps__container">
    <h1 class="mt-5">Tipps</h1>
    <br>
    <div v-for="tipp in list" :key="tipp.id">
        <tipp-card :tipp="tipp" class="mb-5"/>
    </div>
    <br>
    <br>
  </v-container>
</template>

<script>
import TippCard from '@/components/TippCard'
export default {
  name: 'Tipps',
  components: { TippCard },
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

<style scoped>
.tipps__container {
  position: relative;
}

</style>
