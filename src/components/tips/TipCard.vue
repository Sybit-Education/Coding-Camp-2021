<template>
  <router-link
    :to="{ name: 'TipDetail', params: { tipId: tip.id } }"
    class="text-decoration-none"
  >
    <v-card class="tip-teaser-card rounded-xl">
      <v-row>
        <v-col md="4" sm="12">
          <v-img
            :src="imageSource"
            class="tip-teaser-card__image rounded-xl rounded-b-0"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5" />
              </v-row>
            </template>
          </v-img>
        </v-col>
        <v-col md="8" sm="12">
          <v-card-title class="tip-teaser-card__title">
            {{ tip.title }}
          </v-card-title>
          <v-card-text>
            <markdown-wrapper
              :source="tip.teaser"
              class="tip-teaser-card__teaser"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn class="tip-teaser-card__more" text>mehr &hellip;</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </router-link>
</template>

<script>
import MarkdownWrapper from '@/components/MarkdownWrapper.vue'

export default {
  components: { MarkdownWrapper },
  name: 'TipCard',
  props: {
    tip: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageSource () {
      if (this.tip?.teaserImage?.length) {
        return this.tip.teaserImage[0].url
      }
      return require('@/assets/tips_placeholder.svg')
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .tip-teaser-card {
  border: 1px solid rgba(194, 194, 194, 0.4);
  box-shadow: 0 4px 8px rgba(105, 118, 124, 0.1) !important;
  transition: 200ms cubic-bezier(0.22, 0.6, 0.52, 0.99);
  margin: 24px 0;

  &:hover {
    box-shadow: 0 8px 16px rgba(105, 118, 150, 0.2) !important;
  }

  &__title {
    font-weight: bold;
    word-break: normal;
  }

  &__image {
    width: 100%;
    height: auto;
    max-height: 200px;
    object-fit: cover;
    border-radius: 0 0 4px 4px;
  }

  &__teaser {
    line-height: 1.75rem !important;
  }

  &__more {
    color: rgba(255, 111, 0, 0.87);
  }
}
</style>
