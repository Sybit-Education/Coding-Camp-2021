<template>
  <v-container id="tip-list">
    <headline-bar title="Tipps" />
    <loading-spinner v-if="showLoadingSpinner" />
    <div
      v-for="tip in tipList"
      v-else
      :key="tip.id"
    >
      <tip-card
        :tip="tip"
        class="mb-5"
      />
    </div>
  </v-container>
</template>

<script lang="ts">
import { mapState } from 'pinia'

import HeadlineBar from '@/components/HeadlineBar.vue'
import TipCard from '@/components/tips/TipCard.vue'

import { useTipStore } from '@/store/tip.store'
import { useLoadingStore } from '@/store/loading.store'

export default {

  name: 'TipsListView',
  components: {
    HeadlineBar,
    TipCard
  },
  head: {
    title: 'Tipps zur Entsorgung'
  },
  computed: {
    ...mapState( useTipStore, ['tipList']),
    ...mapState( useLoadingStore, ['showLoadingSpinner'])
  }


}
</script>
