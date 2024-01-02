<template>
  <a
    :href="item.link"
    class="text-decoration-none"
    target="_blank"
    rel="noopener noreferrer"
  >
    <v-card v-if="item" class="press-teaser-card rounded-xl">
      <v-card-text>
        <v-row>
          <v-col cols="6">{{ item.source }}</v-col>
          <v-col cols="6" class="text-right">{{ publishedDate }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-title class="press-teaser-card__title">
        {{ item.title }}
      </v-card-title>
      <v-card-text>
        <markdown-wrapper
          :source="item.teaser"
          class="press-teaser-card__teaser"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn class="press-teaser-card__more" text>mehr &hellip;</v-btn>
      </v-card-actions>
    </v-card>
    <v-skeleton-loader v-else type="card" />
  </a>
</template>

<script>
import MarkdownWrapper from '@/components/MarkdownWrapper.vue'

export default {
  components: { MarkdownWrapper },
  name: 'PressCard',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    publishedDate () {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }
      return new Date(this.item.published).toLocaleDateString('de-DE', options)
    }
  }
}
</script>
<style lang="scss" scoped>
.press-teaser-card {
  border: 1px solid rgba(194, 194, 194, 0.4);
  box-shadow: 0 4px 8px rgba(105, 118, 124, 0.1) !important;
  transition: 200ms cubic-bezier(0.22, 0.6, 0.52, 0.99);

  &:hover {
    box-shadow: 0 8px 16px rgba(105, 118, 150, 0.2) !important;
  }

  &__title {
    font-weight: bold;
    word-break: normal;
  }
  &__teaser {
    line-height: 1.75rem !important;
  }
  &__more {
    color: rgba(255, 111, 0, 0.87);
  }
}
</style>
