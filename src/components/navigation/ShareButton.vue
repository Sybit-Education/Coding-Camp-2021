<template>
  <v-btn
    fab
    top
    small
    right
    :fixed="fixed"
    class="share-button mt-3"
    aria-hidden="false"
    aria-label="Teilen"
    v-if="isShareable"
    @click="shareDetails"
  >
    <v-icon> mdi-share-variant </v-icon>
  </v-btn>
</template>
<script>
export default {
  name: 'ShareButton',
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    fixed: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isShareable () {
      return 'share' in navigator
    }
  },
  methods: {
    shareDetails () {
      if (!this.isShareable) {
        return
      }
      const data = {
        title: this.title,
        text: this.text,
        url: this.url
      }
      navigator.share(data)
    }
  }
}
</script>
<style lang="scss" scoped>
.share-button {
  @include glassmorphism(
    $color: white,
    $blur-ammount: 4px,
    $color-intensity: 0.4
  );
  z-index: 2;
  margin-bottom: calc(0.5 * #{$bottom-navigation-height});

  @media #{map-get($display-breakpoints, 'xs-only')} {
    margin-bottom: calc(1.5 * #{$bottom-navigation-height});
  }
}
</style>
