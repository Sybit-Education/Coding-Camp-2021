<template>
  <div>
    <h3 class="ml-5 mt-5">Unsere Partner</h3>
    <v-carousel
        v-if="partnerList && partnerList.length > 0"
        cycle
        height="120"
        width="200"
        hide-delimiter-background
        hide-delimiters
        show-arrows-on-hover
    >
      <v-carousel-item
          v-for="partner in partnerList"
          :key="partner.id"
      >
        <div class="d-flex justify-center">
          <a :href="partner.website">
            <v-img :src="partner.logo[0].url" contain width="250" height="100"/>
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
