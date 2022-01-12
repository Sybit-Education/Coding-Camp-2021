<template>
  <v-container id="problemstoffmobil">
    <h1 class="mb-5">Problemstoff-Sammeltermine</h1>
    <p>
      Das Problemstoff-Mobil kommt für die Sammeltermine in die Gemeinden des
      Landkreis Konstanz. Suchen Sie sich den nächsten Sammeltermin für Ihre
      Gemeinde:
    </p>
    <loading-spinner v-if="showLoadingSpinner"></loading-spinner>
    <municipality-filter :event-list="unfilteredList" @doFilter="filter" />
    <div v-for="event in list" :key="event.id">
      <event-card :event="event" />
    </div>
  </v-container>
</template>

<script>
import problemstoffmobilService from '@/services/problemstoffmobil.service'
import EventCard from '@/components/problemstoffmobil/EventCard.vue'
import MunicipalityFilter from '@/components/problemstoffmobil/MunicipalityFilter.vue'

export default {
  name: 'Problemstoffmobil',
  components: { EventCard, MunicipalityFilter },
  data () {
    return {
      list: [],
      unfilteredList: [],
      showLoadingSpinner: true
    }
  },
  metaInfo () {
    return {
      title: 'Problemstoff-Sammeltermine im Landkreis Konstanz'
    }
  },
  async created () {
    this.unfilteredList = this.list =
      await problemstoffmobilService.getRecords()
    this.showLoadingSpinner = false
  },
  methods: {
    filter (municipality) {
      this.list = this.unfilteredList
      this.list = this.list.filter(
        (event) => event.municipality === municipality
      )
    }
  }
}
</script>
