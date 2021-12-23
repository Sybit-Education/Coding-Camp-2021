<template>
  <div>
    <h3>Unsere Partner</h3>
    <v-carousel
        v-if="partnerList && partnerList.length > 0"
        cycle
        max-width="320"
        max-height="200"
        hide-delimiter-background
        hide-delimiters
        :show-arrows="false"
    >
      <v-carousel-item
          v-for="partner in partnerList"
          :key="partner.id"
      >
        <div class="d-flex justify-center">
          <a :href="partner.website">
            <v-img
              :src="partner.logo[0].url"
              :alt="partner.name"
              contain
              max-width="300"
              max-height="200" />
          </a>
        </div>
      </v-carousel-item>
    </v-carousel>
    <v-skeleton-loader v-else type="image"/>
  </div>
</template>
<script>
import partnerService from '@/services/partner.service'

export default {
  name: 'PartnerCarousel',
  data () {
    return {
      partnerList: []
    }
  },
  created () {
    partnerService.getPartnerRecords().then(list => {
      this.partnerList = list
    })
  }
}
</script>
