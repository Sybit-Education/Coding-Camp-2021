<template>
  <v-card :id="event.id" class="rounded-xl my-3">
    <v-card-title>
      <h4>{{ eventdate }}</h4>
    </v-card-title>
    <v-card-text>
      <p>
        <b>Zeitraum:</b>
        {{ event.timeFrom }} - {{ event.timeTo }}
      </p>
      <p>
        <b>Sammelpunkt:</b><br />
        {{ event.collectionPoint }}<br />
        {{ event.municipality
        }}<span v-if="event.district">, Ortsteil: {{ event.district }}</span>
      </p>
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
