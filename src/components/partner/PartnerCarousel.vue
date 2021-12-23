<template>
  <div>
    <h3>Unsere Partner</h3>
    <v-carousel
      v-if="partnerList && partnerList.length > 0"
      class="partner-carousel"
      height="220"
      cycle
      hide-delimiter-background
      hide-delimiters
      :show-arrows="false"
    >
      <v-carousel-item v-for="partner in partnerList" :key="partner.id">
        <v-sheet class="d-flex justify-center">
          <router-link :to="`/partner#${partner.id}`">
            <v-img
              class="partner-logo"
              :src="partner.logo[0].url"
              :alt="partner.name"
            />
          </router-link>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <v-skeleton-loader v-else type="image" />
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
    partnerService.getPartnerRecords().then((list) => {
      this.partnerList = list
    })
  }
}
</script>
<style lang="scss" scoped>
.partner-logo {
  width: 240px;
  max-height: 240px;
  filter: grayscale(60%);
  &:hover,
  &:focus {
    filter: grayscale(0%);
  }
}
</style>
