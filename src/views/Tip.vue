<template>
  <v-container>
    <tip-detail :tip="tip" class="mt-5"/>
  </v-container>
</template>

<script>
import TipDetail from '@/components/tips/TipDetail.vue'

export default {
  components: { TipDetail },
  name: 'Tip',
  props: {
    tipId: {
      type: String,
      required: true
    }
  },
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
