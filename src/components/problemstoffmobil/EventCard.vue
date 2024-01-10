<template>
  <v-card
    :id="event.id"
    class="event-card rounded-xl my-3"
  >
    <v-card-title>
      <h4>
        <v-icon
          class="event-card__calendar-icon"
          color="primary"
        >
          mdi-calendar
        </v-icon>
        {{ eventdate }}
      </h4>
      <share-button
        :title="shareTitle"
        :url="shareUrl"
        :text="shareText"
        :fixed="false"
        class="event-card__share-button"
      />
    </v-card-title>
    <v-card-text>
      <div>
        <v-icon
          size="18"
          class="event-card__clock-icon"
        >
          mdi-clock
        </v-icon>
        <b> Zeitraum:</b> {{ timeFrom }} - {{ timeTo }}
      </div>
      <div>
        <v-icon
          size="18"
          class="event-card__map-marker-icon"
        >
          mdi-map-marker
        </v-icon><b> Sammelpunkt:</b>
        <div class="event-card__pickup">
          {{ event.collectionPoint }}<br>
          {{ event.municipality
          }}<span v-if="event.district">, Ortsteil: {{ event.district }}</span>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import ShareButton from '../navigation/ShareButton.vue'

export default {
  name: 'EventCard',
  components: {
    ShareButton
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    eventdate () {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
      return new Date(this.event.date).toLocaleDateString('de-DE', options)
    },
    timeFrom () {
      return new Date(this.event.timeFrom * 1000).toISOString().substr(11, 5)
    },
    timeTo () {
      return new Date(this.event.timeTo * 1000).toISOString().substr(11, 5)
    },
    shareTitle () {
      return `Problemstoff-Mobil am ${this.eventdate} in ${this.event.municipality}`
    },
    shareUrl () {
      return `/problemstoffmobil#${this.event.id}`
    },
    shareText () {
      return `Am ${this.eventdate} ist das Problemstoff-Mobil von ${this.timeFrom} bis ${this.timeTo} Uhr in ${this.event.municipality}.
      Sammelpunkt: ${this.event.collectionPoint}`
    }
  }
}
</script>
<style lang="scss" scoped>
.event-card {
  &__pickup {
    padding-left: 1.25rem;
  }
  &__share-button {
    position: absolute;
    right: 1rem;
    top: 0;
  }
}
</style>
