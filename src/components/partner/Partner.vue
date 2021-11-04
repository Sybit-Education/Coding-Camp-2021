<template>
<div>
  <h2>Partner:</h2>
    <v-carousel
    cycle
    height="200"
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
      <v-img :src="partner.logo[0].url" contain width="200" height="200" />
    </div>
    </v-carousel-item>
  </v-carousel>
</div>
</template>
<script>
import partnerService from '@/services/partner.service'
export default {
  data () {
    return {
      partnerList:[]
      
      
    }
  },
  created() {
    partnerService.getPartnerRecords().then(list => {
      this.partnerList = list
    })
  }
}
</script>

<style scoped>
</style>
