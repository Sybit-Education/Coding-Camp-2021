<template>
  <v-container>
    <headline-bar title="Offizielle Partner der Mülli-App" />

    <loading-spinner v-if="showLoadingSpinner" />
    <v-row>
      <v-col
        v-for="partner in list"
        :key="partner.id"
        cols="12"
        xl="6"
      >
        <partner-card
          :partner="partner"
          class="mb-5"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import partnerService from '@/services/partner.service'
import PartnerCard from '@/components/partner/PartnerCard.vue'
import HeadlineBar from '@/components/HeadlineBar.vue'
import Partner from '@/types/partner'

export default {
  name: 'PartnerView',
  components: {
    PartnerCard,
    HeadlineBar
  },
  data () {
    return {
      list: Array<Partner>(),
      showLoadingSpinner: true
    }
  },
  head: {
    title: 'Unsere Partner'
  },
  created () {
    partnerService.getPartnerRecords().then((list) => {
      this.list = list
      this.showLoadingSpinner = false
    })
  }
}
</script>
