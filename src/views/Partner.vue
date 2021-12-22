<template>
  <v-container>
    <h1 class="mb-5">Offizielle Partner der Mülli-App</h1>
    <loading-spinner v-if="showLoadingSpinner"></loading-spinner>
    <v-row>
      <v-col v-for="partner in list" :key="partner.id" cols="12" xl="6">
        <partner-card :partner="partner" class="mb-5" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import partnerService from '@/services/partner.service'
import partnerCard from '@/components/partner/PartnerCard.vue'

export default {
  name: 'Tipps',
  components: { partnerCard },
  data () {
    return {
      list: [],
      showLoadingSpinner: true
    }
  },
  metaInfo () {
    return {
      title: 'Unsere Partner'
    }
  },
  created () {
    partnerService.getPartnerRecords().then((list) => {
      this.list = list
      this.showLoadingSpinner = false
    })
  }
}
</script>
