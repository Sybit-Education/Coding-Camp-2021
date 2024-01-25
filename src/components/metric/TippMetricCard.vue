import { mapGetters } from 'vuex';
<template>
  <v-card
    class="rounded-xl text-center py-3 bg-grey-lighten-3"
    to="/tipps"
  >
    <div class="text-h4 font-weight-black">
      <number-animation
        :to="count"
        :duration="1"
        :format="format"
      />
    </div>
    <div class="text-caption">
      Tipps
    </div>
  </v-card>
</template>

<script lang="ts">
import NumberAnimation from "vue-number-animation"
import { mapState } from 'pinia'
import { useTipStore } from '@/store/tip.store'

export default {
  components: {
    NumberAnimation
  },
  computed: {
    ...mapState(useTipStore, {
      count: store =>  store.tipList.length
    })
  },
  methods: {
    format (value: number) {
      return value.toFixed(0)
    }
  }
}
</script>
