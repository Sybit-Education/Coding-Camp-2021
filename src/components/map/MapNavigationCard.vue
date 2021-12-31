<template>
  <v-card class="bottom-sheet__card">
    <v-btn fixed icon right>
      <v-icon large @click="close"> mdi-close </v-icon>
    </v-btn>
    <div v-if="location">
      <div class="bottom-sheet__subtitle text--secondary">
        {{ location.type }}
      </div>
      <h2 class="bottom-sheet__title">{{ location.name }}</h2>
      <div v-if="location.notes">
        <markdown :source="location.notes" class="bottom-sheet__notes" />
      </div>
      <div v-if="location.link">
        <h3>Weitere Informationen</h3>
        <div>
          <a
            :href="location.link"
            class="bottom-sheet__link"
            target="_blank"
            rel="noopener noreferrer"
            >{{ location.link }}</a
          >
        </div>
      </div>
      <v-row v-if="location.images">
        <v-col v-for="img in location.images" :key="img" cols="auto">
          <v-img :src="img" class="bottom-sheet__image"></v-img>
        </v-col>
      </v-row>
      <v-row align-content="center" justify="center">
        <v-col cols="12" lg="2" md="4" sm="6">
          <v-btn
            block
            class="rounded-xl py-7 bottom-sheet__navigation-button"
            color="primary"
            @click="openGoogleMaps(location.latitude, location.longitude)"
          >
            Navigation starten &hellip;
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <loading-spinner v-else />
  </v-card>
</template>

<script>
import Markdown from '@/components/Markdown'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default {
  name: 'MapNavigationCard',
  props: {
    location: {
      type: Object,
      default: null
    }
  },
  components: {
    Markdown,
    LoadingSpinner
  },
  methods: {
    close () {
      this.$emit('close')
      this.active = false
    },
    openGoogleMaps (lat, lng) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import "node_modules/vuetify/src/styles/settings/variables";
@import "src/scss/variables";

.bottom-sheet {
  &__card {
    overflow-y: scroll;
    padding: 1rem 1rem 1.75rem 0.75rem;
    height: clamp(50vh, 70vh, 80vh);
    display: grid;
  }

  &__title {
    margin: 1rem 0;
    font-size: clamp(2rem, 8vw, 2.5rem);
  }

  &__link {
    word-break: break-all;

    &::before {
      content: "🌐";
      margin-right: 4px;
      text-decoration: none;
      display: inline-block;
    }
  }

  &__notes {
    font-size: clamp(1rem, 2vw, 1.25rem);
    hyphens: auto;
  }

  &__image {
    border-radius: 20px;
    width: clamp(250px, calc(50vw - 40px), 1600px);
  }

  &__navigation-button {
    position: absolute;
    bottom: 1.5rem;
    left: 0;
    right: 0;
  }
}
</style>
