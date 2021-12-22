<template>
  <v-container>
    <h1 class="mb-5">Offizielle Partner der Mülli-App</h1>
    <loading-spinner v-if="showLoadingSpinner"></loading-spinner>
    <div v-for="partner in list" :key="partner.id">
      <partner-card :partner="partner" class="mb-5" />
    </div>
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
  async created () {
    partnerService.getPartnerRecords().then((list) => {
      this.list = list
      this.showLoadingSpinner = false
    })
  }
}
</script>
