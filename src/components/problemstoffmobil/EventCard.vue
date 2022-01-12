<template>
  <v-card :id="event.id" class="event-card rounded-xl my-3">
    <v-card-title>
      <h4>
        <v-icon class="event-card__calendar-icon" color="primary"
          >mdi-calendar</v-icon
        >
        {{ eventdate }}
      </h4>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="1"
          ><v-icon size="20" class="event-card__clock-icon"
            >mdi-clock</v-icon
          ></v-col
        >
        <v-col cols="11">
          <b>Zeitraum:</b> {{ event.timeFrom }} - {{ event.timeTo }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1"
          ><v-icon size="20" class="event-card__map-marker-icon"
            >mdi-map-marker</v-icon
          ></v-col
        >
        <v-col cols="11">
          <b>Sammelpunkt:</b><br />
          {{ event.collectionPoint }}<br />
          {{ event.municipality
          }}<span v-if="event.district">, Ortsteil: {{ event.district }}</span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    eventdate () {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
      return new Date(this.event.date).toLocaleDateString('de-DE', options)
    }
  }
}
</script>
