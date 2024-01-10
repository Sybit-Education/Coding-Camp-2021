<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="11"
        xl="8"
      >
        <div class="tips">
          <loading-spinner v-if="!tip" />
          <back-button />
          <share-button
            v-if="tip"
            :title="tip.title"
            :text="tip.teaser"
            :url="$route.path"
          />
          <div
            v-if="tip"
            class="card"
          >
            <v-img
              :src="imageSource"
              class="card__image card__image--top rounded-xl"
              cover
              min-width="320"
              max-width="320"
            >
              <template #placeholder>
                <v-row
                  align="center"
                  class="fill-height ma-0"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey-lighten-5"
                  />
                </v-row>
              </template>
            </v-img>
            <v-img
              :src="imageSource"
              class="
                card__image card__image--top card__image-background
                rounded-xl
              "
              cover
              min-width="320"
              max-width="320"
            />
            <div class="card__title text-grey-darken-3">
              {{ tip.title }}
            </div>
            <markdown-wrapper
              :source="tip.teaser"
              class="card__teaser text-grey-darken-3"
            />
            <div class="card__markdown-wrapper">
              <v-img
                :src="imageSource"
                class="card__image card__image--bottom rounded-xl"
                cover
                min-width="320"
              />
              <markdown-wrapper
                :source="tip.article"
                class="card__markdown"
              />
              <markdown-wrapper
                v-if="tip.teaserImageSource"
                :source="tip.teaserImageSource"
                class="card__image-source text-grey-lighten-1"
              />
            </div>
          </div>
          <v-skeleton-loader
            v-if="!tip"
            type="card"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import tipService from '@/services/tip.service'
import BackButton from '@/components/navigation/BackButton.vue'
import ShareButton from '@/components/navigation/ShareButton.vue'
import MarkdownWrapper from '@/components/MarkdownWrapper.vue'
import Tip from '@/types/tip'
import materialPlaceholder from '/img/material_placeholder.svg'
import { useTipStore } from "@/store/tip.store"

export default {
  name: 'TipView',
  components: {
    BackButton,
    ShareButton,
    MarkdownWrapper
  },
  data () {
    return {
      tip: null as Tip | null
    }
  },
  /* TODO
  head: {
    title: this.title,
    meta: [
      // Twitter Card
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: this.title },
      { name: 'twitter:description', content: `${this.teaser}` },
      // image must be an absolute path
      { name: 'twitter:image', content: this.imageSource },

      // Facebook OpenGraph
      { property: 'og:title', content: this.title },
      { property: 'og:site_name', content: 'Mülli' },
      { property: 'og:type', content: 'article' },
      { property: 'og:image', content: this.imageSource },
      { property: 'og:description', content: this.teaser },
      { property: 'og:url', content: this.$route.path }
    ]
  }, */
  computed: {
    tipId (): string {
      return this.$route.params.tipId as string
    },
    title () {
      return this.tip ? this.tip.title : 'Tipp'
    },
    teaser () {
      return this.tip ? this.tip.teaser : ''
    },
    tipFromStore (): Tip | null {
      return useTipStore().getTipById(this.tipId)
    },
    imageSource (): string {
      if (this.tip?.teaserImage?.length) {
        return this.tip.teaserImage[0].url
      }
      return materialPlaceholder
    }
  },
  async created () {
    await this.getTip()
    window.scrollTo(0, 0)
  },
  methods: {
    async getTip () {
      if (this.tipFromStore) {
        this.tip = this.tipFromStore
      } else {
        this.tip = await tipService.getTip(this.tipId)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@use 'vuetify/settings' as v;
.card {
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-template-columns: repeat(10, 1fr);
  row-gap: 1em;
  padding: 1rem;

  @media #{map-get(v.$display-breakpoints, 'xs')} {
    padding: 0.5rem;
  }

  &__title {
    grid-area: 1 / 1 / span 1 / -1;
    word-break: break-word;
    font-weight: bolder;
    font-size: clamp(1.3rem, 4vw, 2rem) !important;

    @media #{map-get(v.$display-breakpoints, 'xs')} {
      grid-area: 2 / 1 / span 1 / -1;
    }
  }

  &__teaser {
    line-height: 1.7rem;
    grid-area: 2 / 1 / 3 / -1;
    font-weight: bold;
    @media #{map-get(v.$display-breakpoints, 'xs')} {
      grid-area: 3 / 1 / span 1 / -1;
    }
  }

  :deep(.card__markdown) {
    font-family: $body-font-family, sans-serif !important;
    color: #616161 !important;
    line-height: 1.7rem;

    a {
      word-break: break-word;
    }

    strong {
      letter-spacing: 0.1rem;
      line-height: 2.5em;
    }

    ul li {
      line-height: 1.75em;
    }

  }

  &__image {
    padding: 0;
    &--top {
      z-index: 1 !important;
      max-width: 320px;
      display: none;
      place-self: center;
      grid-area: 1 / 1 / span 1 / -1;
      @media #{map-get(v.$display-breakpoints, 'xs')} {
        display: block;
      }
    }

    &--bottom {
      max-width: 320px;
      float: right;
      margin: 0.5rem 0.5rem 1rem 0;
      @media #{map-get(v.$display-breakpoints, 'xs')} {
        display: none;
      }
    }

    &-background {
      z-index: 0 !important;
      transform: translateY(20px) scaleX(0.8);
      filter: blur(30px) opacity(60%);
    }

    &-source {
      margin: 1.5rem 0 0 0;
      font-size: 10px;
    }
  }
  .card__markdown-wrapper {
      grid-area: 3 / 1 / span 1 / -1;
      @media #{map-get(v.$display-breakpoints, 'xs')} {
        grid-area: 4 / 1 / span 1 / -1;
      }
    }
}
</style>
