<template>
  <v-row class="partner-carousel">
    <v-col
      v-for="partner in partnerList"
      :key="partner.id"
      cols="6"
      xs="6"
      sm="4"
      md="3"
      xl="2"
    >
      <v-card
        class="partner-carousel__card rounded-xl d-flex justify-center  px-3"
        :to="`/partner#${partner.id}`"
      >
        <v-img
          class="partner-logo"
          :src="partner.logo[0].url"
          :alt="partner.name"
          contain
        />
      </v-card>
    </v-col>
  </v-row>
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
.partner-carousel__card {
  height: 180px;
  max-width: 480px;
}
.partner-logo {
  filter: grayscale(90%);
  &:hover,
  &:focus {
    filter: grayscale(0%);
  }
}
</style>
