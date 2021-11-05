<template>
<div>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
    <v-carousel
    cycle
    height="140"
    width="140"
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
      <v-img :src="partner.logo[0].url" contain width="140" height="140" />
      </a>
    </div>
    </v-carousel-item>
  </v-carousel>
  <p>
    Partner:
  </p>
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