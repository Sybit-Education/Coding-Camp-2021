<template>
  <v-btn
    v-if="isShareable"
    location="top right"
    size="small"
    icon="mdi-share-variant"
    :fixed="fixed"
    class="share-button mt-3"
    aria-hidden="false"
    aria-label="Teilen"
    @click="shareDetails"
  />
</template>
<script lang="ts">

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
@use "@/styles/variables.scss";
@use 'vuetify/settings' as v;

.share-button {
  @include glassmorphism(
    $color: white,
    $blur-ammount: 4px,
    $color-intensity: 0.4
  );
  z-index: 999;
  --margin-bottom: calc(0.5 * #{$bottom-navigation-height});

  @media #{map-get(v.$display-breakpoints, 'xs')} {
    --margin-bottom: calc(1.5 * #{$bottom-navigation-height});
  }
}
</style>
