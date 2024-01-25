<template>
  <v-container>
    <h1 class="mb-5">
      Problemstoff-Sammeltermine
    </h1>
    <p>
      Das Problemstoff-Mobil kommt für die Sammeltermine in die Gemeinden des
      Landkreis Konstanz. Suchen Sie sich den nächsten Sammeltermin für Ihre
      Gemeinde:
    </p>
    <loading-spinner v-if="showLoadingSpinner" />
    <v-row v-else>
      <v-col
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
        xl="4"
        offset-xl="4"
      >
        <municipality-filter
          :event-list="eventList"
          @do-filter="filter"
        />
        <event-card
          v-for="event in list"
          :key="event.id"
          :event="event"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import EventCard from '@/components/problemstoffmobil/EventCard.vue'
import MunicipalityFilter from '@/components/problemstoffmobil/MunicipalityFilter.vue'
import { useLoadingStore } from '@/store/loading.store'
import { useEventStore } from '@/store/problemstoffmobil.store'
import type Event from '@/types/event'
import { mapState } from 'pinia'

export default {
  name: 'ProblemstoffMobil',
  components: { EventCard, MunicipalityFilter },
  data () {
    return {
      list: Array<Event>()
    }
  },
  head: {
    title: 'Problemstoff-Sammeltermine im Landkreis Konstanz'
  },
  computed: {
    ...mapState(useEventStore, {
      eventList: store => store.eventList
    }),
    ...mapState(useLoadingStore, {
      showLoadingSpinner: store => store.showLoadingSpinner
    })
  },
  async created () {
    await useEventStore().getEventRecords()
    this.list = this.eventList
  },
  methods: {
    filter (municipality: string) {
      this.list = this.eventList
      this.list = this.list.filter(
        (event) => event.municipality === municipality
      )
    }
  },
}
</script>
