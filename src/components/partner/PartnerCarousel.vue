<template>
  <div>
    <v-carousel
      v-if="partnerList && partnerList.length > 0"
      class="partner-carousel"
      width="auto"
      height="auto"
      cycle
      hide-delimiter-background
      hide-delimiters
      :show-arrows="false"
    >
      <v-carousel-item
        v-for="partner in partnerList"
        :key="partner.id"
        :to="`/partner#${partner.id}`"
      >
        <v-card class="rounded-xl d-flex justify-center my-1 mx-1 px-3 py-3">
          <v-img
            class="partner-logo"
            :src="partner.logo[0].url"
            :alt="partner.name"
            contain
          />
        </v-card>
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
  max-width: 400px;
  height: 220px;
  filter: grayscale(60%);
  &:hover,
  &:focus {
    filter: grayscale(0%);
  }
}
</style>
