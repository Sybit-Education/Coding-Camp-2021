<template>
  <v-container id="tip-list">
    <headline-bar title="Tipps" />
    <loading-spinner v-if="showLoadingSpinner"></loading-spinner>
    <div v-for="tip in list" :key="tip.id">
      <tip-card :tip="tip" class="mb-5" />
    </div>
  </v-container>
</template>

<script>
import HeadlineBar from '@/components/HeadlineBar.vue'
import TipCard from '@/components/tips/TipCard.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'TipsListView',
  components: { TipCard, HeadlineBar },
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
