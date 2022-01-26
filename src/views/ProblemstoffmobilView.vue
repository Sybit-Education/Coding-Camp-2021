<template>
  <v-container>
    <h1 class="mb-5">Problemstoff-Sammeltermine</h1>
    <p>
      Das Problemstoff-Mobil kommt für die Sammeltermine in die Gemeinden des
      Landkreis Konstanz. Suchen Sie sich den nächsten Sammeltermin für Ihre
      Gemeinde:
    </p>
    <loading-spinner v-if="showLoadingSpinner"></loading-spinner>
    <v-row v-else>
      <v-col md="8" offset-md="2" lg="6" offset-lg="3" xl="4" offset-xl="4">
        <municipality-filter :event-list="eventList" @doFilter="filter" />
        <event-card v-for="event in list" :key="event.id" :event="event" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EventCard from '@/components/problemstoffmobil/EventCard.vue'
import MunicipalityFilter from '@/components/problemstoffmobil/MunicipalityFilter.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'ProblemstoffmobilView',
  components: { EventCard, MunicipalityFilter },
  data () {
    return {
      list: []
    }
  },
  metaInfo () {
    return {
      title: 'Problemstoff-Sammeltermine im Landkreis Konstanz'
    }
  },
  async created () {
    await this.$store.dispatch('Problemstoffmobil/getEventRecords')
    this.list = this.eventList
  },
  methods: {
    filter (municipality) {
      this.list = this.eventList
      this.list = this.list.filter(
        (event) => event.municipality === municipality
      )
    }
  },
  computed: {
    ...mapGetters({
      eventList: 'Problemstoffmobil/getEventList',
      showLoadingSpinner: 'Loading/showLoadingSpinner'
    })
  }
}
</script>
