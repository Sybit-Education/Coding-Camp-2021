<template>
  <v-card
    class="rounded-xl text-center py-3 bg-grey-lighten-3"
    to="/partner"
  >
    <div class="text-h4 font-weight-black">
      <number-animation
        :to="count"
        :duration="1"
        :format="format"
      />
    </div>
    <div class="text-caption">
      Partner
    </div>
  </v-card>
</template>

<script lang="ts">
import partnerService from '@/services/partner.service'
import NumberAnimation from "vue-number-animation"

export default {
  name: 'PartnerMetricCard',
  components: { NumberAnimation },
  data () {
    return {
      count: 0
    }
  },
  mounted () {
    partnerService.getPartnerRecords().then((list) => {
      this.count = list.length
    })
  },
  methods: {
    format (value: number) {
      return value.toFixed(0)
    }
  }
}
</script>
