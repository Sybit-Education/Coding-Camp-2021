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
        />
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import partnerService from '@/services/partner.service'
import type Partner from '@/types/partner'

export default {

  name: 'PartnerCarousel',
  data () {
    return {
      partnerList: Array<Partner>()
    }
  },
  created () {
    partnerService.getPartnerRecords().then((list: Array<Partner>) => {
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
  filter: grayscale(60%);
  &:hover,
  &:focus {
    filter: grayscale(0%);
  }
}
</style>
