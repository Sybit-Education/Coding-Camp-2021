<template>
  <v-container>
    <tip-detail :tipId="tipId" class="mt-5"/>
  </v-container>
</template>

<script>
import TipDetail from '@/components/tips/TipDetail.vue'

export default {
  components: { TipDetail },
  name: 'Tip',
  data () {
    return {
      tip: this.$store.getters.getTipById(this.tipId)
    }
  },
  metaInfo () {
    return {
      title: this.tipTitle
    }
  },
  computed: {
    tipId () {
      return this.$route.params.tipId
    },
    tipTitle () {
      if (this.tip) {
        return this.tip.title
      } else {
        return 'Tipp'
      }
    }
  }
}
</script>
