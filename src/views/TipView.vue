<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="11" xl="8">
        <div class="tips">
          <loading-spinner v-if="showLoadingSpinner"></loading-spinner>
          <back-button />
          <share-button
            v-if="tip"
            :title="tip.title"
            :text="tip.teaser"
            :url="$route.path"
          >
          </share-button>
          <div class="card" v-if="tip">
            <v-img
              :src="imageSource"
              class="card__image card__image--top rounded-xl"
              contain
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5" />
                </v-row>
              </template>
            </v-img>
            <v-img
              :src="imageSource"
              class="
                card__image card__image--top card__image-background
                rounded-xl
              "
              contain
            >
            </v-img>
            <div class="card__title grey--text text--darken-3">
              {{ tip.title }}
            </div>
            <markdown-wrapper
              :source="tip.teaser"
              class="card__teaser grey--text text--darken-3"
            />
            <div class="card__markdown-wrapper">
              <v-img
                :src="imageSource"
                class="card__image card__image--bottom rounded-xl"
                contain
              >
              </v-img>
              <markdown-wrapper :source="tip.article" class="card__markdown" />
              <markdown-wrapper
                :source="this.tip.teaserImageSource"
                class="card__image-source grey--text text--lighten-1"
              />
            </div>
          </div>
          <v-skeleton-loader v-if="!tip" type="card" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import tipService from '@/services/tip.service'
import BackButton from '@/components/navigation/BackButton.vue'
import ShareButton from '@/components/navigation/ShareButton.vue'
import MarkdownWrapper from '@/components/MarkdownWrapper.vue'

export default {
  components: { BackButton, ShareButton, MarkdownWrapper },
  name: 'TipView',
  data () {
    return {
      showLoadingSpinner: false,
      tip: null
    }
  },
  async created () {
    await this.getTip()
    window.scrollTo(0, 0)
  },
  metaInfo () {
    return {
      title: this.title,
      meta: [
        // Twitter Card
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: this.title },
        { name: 'twitter:description', content: this.teaser },
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
    }
  },
  methods: {
    async getTip () {
      const tipFromStore = this.$store.getters['Tip/getTipById'](this.tipId)
      if (tipFromStore) {
        this.tip = tipFromStore
      } else {
        this.tip = await tipService.getTip(this.tipId)
      }
      this.showLoadingSpinner = false
    }
  },
  computed: {
    tipId () {
      return this.$route.params.tipId
    },
    title () {
      return this.tip ? this.tip.title : 'Tipp'
    },
    teaser () {
      return this.tip ? this.tip.teaser : ''
    },
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
@import "~@/assets/scss/variables.scss";
.card {
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-template-columns: repeat(10, 1fr);
  row-gap: 1em;
  padding: 1rem;

  @media #{map-get($display-breakpoints, 'xs-only')} {
    padding: 0.5rem;
  }

  &__title {
    grid-area: 1 / 1 / span 1 / -1;
    word-break: break-word;
    font-weight: bolder;
    font-size: clamp(1.3rem, 4vw, 2rem) !important;

    @media #{map-get($display-breakpoints, 'xs-only')} {
      grid-area: 2 / 1 / span 1 / -1;
    }
  }

  &__teaser {
    line-height: 1.7rem;
    grid-area: 2 / 1 / 3 / -1;
    font-weight: bold;
    @media #{map-get($display-breakpoints, 'xs-only')} {
      grid-area: 3 / 1 / span 1 / -1;
    }
  }

  :deep(&__markdown) {
    font-family: "Atkinson Hyperlegible", sans-serif !important;
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

    &-wrapper {
      grid-area: 3 / 1 / span 1 / -1;
      @media #{map-get($display-breakpoints, 'xs-only')} {
        grid-area: 4 / 1 / span 1 / -1;
      }
    }
  }

  &__image {
    padding: 0;
    &--top {
      z-index: 1 !important;
      max-width: 320px;
      display: none;
      margin: 3rem 0 1rem 0;
      place-self: center;
      grid-area: 1 / 1 / span 1 / -1;
      @media #{map-get($display-breakpoints, 'xs-only')} {
        display: block;
      }
    }

    &--bottom {
      max-width: 320px;
      float: right;
      @media #{map-get($display-breakpoints, 'xs-only')} {
        display: none;
      }
    }

    &-background {
      z-index: 0 !important;
      transform: translateY(20px) scaleX(0.8);
      filter: blur(30px) opacity(60%);
    }

    &-source {
      font-size: 10px;
    }
  }
}
</style>
