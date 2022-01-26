<template>
  <v-container id="tip-list">
    <h1 class="mb-5">Tipps</h1>
    <loading-spinner v-if="showLoadingSpinner"></loading-spinner>
    <div v-for="tip in list" :key="tip.id">
      <tip-card :tip="tip" class="mb-5" />
    </div>
  </v-container>
</template>

<script>
import tipCard from '@/components/tips/TipCard.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'TipsListView',
  components: { tipCard },
  metaInfo () {
    return {
      title: 'Tipps zur Entsorgung'
    }
  },
  computed: {
    ...mapGetters({
      list: 'Tip/getTipList',
      showLoadingSpinner: 'Loading/showLoadingSpinner'
    })
  }
}
</script>
