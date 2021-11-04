<template>
  <v-container class="tips" fluid>
    <loading-spinner v-if="showLoadingSpinner"></loading-spinner>
    <v-row v-if="tip" justify="center">
      <v-col cols="12" lg="10">
        <v-btn elevation="0" icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <div class="card">
          <v-img :src="imageSource" class="card__image card__image--top" contain></v-img>
          <v-img :src="imageSource" class="card__image card__image--top card__image-background" contain></v-img>
          <div class="card__title grey--text text--darken-3">{{ tip.title }}</div>
          <vue-simple-markdown :source="tip.teaser"
                               class="card__teaser grey--text text--darken-3 body-1 my-2"></vue-simple-markdown>
          <div class="card__markdown-wrapper">
            <v-img :src="imageSource" class="card__image card__image--bottom" contain></v-img>
            <vue-simple-markdown :source="tip.article" class="card__markdown"></vue-simple-markdown>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import tipService from '@/services/tip.service'

export default {
  name: 'TipDetail',
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

.v-carousel {
  height: auto !important;

  ::v-deep &__item {
    height: auto !important;
  }
}

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
      }
    }
  }

  &__image {
    width: clamp(310px, 40vw, 300px);
    border-radius: 8px !important;

    &--top {
      z-index: 1 !important;
      display: none;
      margin: 4rem 0 2rem 0;
      place-self: center;
      grid-area: 1 / 1 / span 1 / -1;
      @media #{map-get($display-breakpoints, 'xs-only')} {
        display: block;
      }
    }

    &--bottom {
      margin: .5rem 0 0 1rem;
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
