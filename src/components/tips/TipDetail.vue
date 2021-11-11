<template>
  <div class="tips">
    <loading-spinner v-if="showLoadingSpinner"></loading-spinner>
    <back-button :to="{ name: 'Tipps'}"></back-button>
    <share-button
      v-if="tip"
      :title="tip.title"
      :text="tip.teaser"
      :url="$route.path"
    >
    </share-button>
    <v-card v-if="tip" class="mx-auto rounded-xl" justify="center">
        <div class="card">
            <v-img :src="imageSource" class="card__image card__image--top rounded-xl" contain>
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  />
                </v-row>
              </template>
            </v-img>
            <div class="card__title grey--text text--darken-3">{{ tip.title }}</div>
            <markdown
                :source="tip.teaser"
                class="card__teaser grey--text text--darken-3">
            </markdown>
            <div class="card__markdown-wrapper">
                <v-img :src="imageSource" class="card__image card__image--bottom rounded-xl" contain></v-img>
                <markdown
                    :source="tip.article"
                    class="card__markdown">
                </markdown>
            </div>
        </div>
    </v-card>
    <v-skeleton-loader v-else type="card" />
  </div>
</template>

<script>
import tipService from '@/services/tip.service'
import Markdown from '@/components/Markdown.vue'
import BackButton from '@/components/navigation/BackButton.vue'
import ShareButton from '@/components/navigation/ShareButton.vue'

export default {
  name: 'TipDetail',
  components: { Markdown, BackButton, ShareButton },
  props: {
    tipId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      tip: null,
      showLoadingSpinner: true
    }
  },
  async created () {
    await this.getTip()
    window.scrollTo(0, 0)
  },
  methods: {
    async getTip () {
      const tipFromStore = this.$store.getters.getTipById(this.tipId)
      if (tipFromStore) {
        this.tip = tipFromStore
        this.showLoadingSpinner = false
      } else {
        this.tip = await tipService.getTip(this.tipId)
        this.showLoadingSpinner = false
      }
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
@import 'src/scss/variables.scss';
@import "node_modules/vuetify/src/styles/settings/_colors.scss";

.tips {
  margin-bottom: 1.5 * $bottom-navigation-height;
}

.card {
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-template-columns: repeat(10, 1fr);
  row-gap: 1em;
  padding: 1rem;

  @media #{map-get($display-breakpoints, 'xs-only')} {
    padding: 0;
  }

  &__title {
    grid-area: 1 / 1 / span 1 / -1;
    word-break: break-word;
    font-weight: bolder;
    font-size: clamp(1.3rem, 4vw, 2rem) !important;

    @media #{map-get($display-breakpoints, 'xs-only')} {
      grid-area: 2 / 1 / span 1 / -1;
      padding: 0 0.5rem 0 0.5rem
    }
  }

  &__teaser {
    line-height: 1.7rem;
    grid-area: 2 / 1 / 3 / -1;
    font-weight: bold;
    @media #{map-get($display-breakpoints, 'xs-only')} {
      grid-area: 3 / 1 / span 1 / -1;
      padding: 0 0.5rem 0 0.5rem
    }
  }

  ::v-deep &__markdown {
    font-family: "Atkinson Hyperlegible", sans-serif !important;
    color: #616161 !important;
    line-height: 1.7rem;

    a {
      word-break: break-word;
    }

    strong {
      letter-spacing: .1rem;
      line-height: 2.5em;
    }

    ul li {
      line-height: 1.75em;
    }

    &-wrapper {
      grid-area: 3 / 1 / span 1 / -1;
      @media #{map-get($display-breakpoints, 'xs-only')} {
        grid-area: 4 / 1 / span 1 / -1;
        padding: 0 0.5rem 0 0.5rem
      }
    }
  }

  &__image {
    padding: 0;
    &--top {
      z-index: 1 !important;
      display: none;
      place-self: center;
      grid-area: 1 / 1 / span 1 / -1;
      @media #{map-get($display-breakpoints, 'xs-only')} {
        display: block;
      }
    }

    &--bottom {
      max-width: 420px;
      float: right;
      @media #{map-get($display-breakpoints, 'xs-only')} {
        display: none;
      }
    }

    &-background {
      z-index: 0 !important;
      transform: translateY(20px) scaleX(.8);
      filter: blur(30px) opacity(60%);
    }

  }
}
</style>
