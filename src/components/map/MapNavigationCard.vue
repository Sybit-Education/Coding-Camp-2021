<template>
  <v-card class="bottom-sheet__card">
    <div v-if="location">
      <div class="bottom-sheet__subtitle text--secondary">
        {{ location.type }}
      </div>
      <h2 class="bottom-sheet__title">
        {{ location.name }}
      </h2>
      <div v-if="location.notes">
        <markdown-wrapper
          :source="location.notes"
          class="bottom-sheet__notes"
        />
      </div>
      <div v-if="location.link">
        <h3>Weitere Informationen</h3>
        <div>
          <a
            :href="location.link"
            class="bottom-sheet__link"
            target="_blank"
            rel="noopener noreferrer"
          >{{ location.link }}</a>
        </div>
      </div>
      <v-row v-if="location.images">
        <v-col
          v-for="img in location.images"
          :key="img"
          cols="auto"
        >
          <v-img
            :src="img"
            class="bottom-sheet__image"
          />
        </v-col>
      </v-row>
      <v-row
        align-content="center"
        justify="center"
      >
        <v-col
          cols="12"
          lg="2"
          md="4"
          sm="6"
        >
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

<script lang="ts">
import MarkdownWrapper from '@/components/MarkdownWrapper.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default {
  name: 'MapNavigationCard',
  components: {
    MarkdownWrapper,
    LoadingSpinner
  },
  props: {
    location: {
      type: Object,
      default: null
    }
  },
  emits: ['close'],
  methods: {
    close () {
      this.$emit('close')
    },
    openGoogleMaps (lat: number, lng: number) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-sheet {
  &__card {
    overflow-y: scroll;
    padding: 1rem 1rem 1.75rem 0.75rem;
    min-height: clamp(25vh, 40vh, 50vh);
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
