<template>
  <div :class="dynamicStyle" @click="scrollToTop">
    <h1 class="mx-3">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HeadlineBar',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      smallSearch: false,
      lastScrollPosition: 0
    }
  },

  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  computed: {
    dynamicStyle () {
      if (this.smallSearch) {
        return 'headline-bar headline-bar--small mb-3'
      } else {
        return 'headline-bar headline-bar--large mb-5'
      }
    }
  },
  methods: {
    onScroll () {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition < 0) {
        return
      }
      // Stop executing this function if the difference between
      // current scroll position and last scroll position is less than some offset
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return
      }
      if (currentScrollPosition > 60) {
        this.smallSearch = true
      } else {
        this.smallSearch = false
      }
      this.lastScrollPosition = currentScrollPosition
    },
    scrollToTop () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.headline-bar {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: left;
  z-index: 1020;

  @include glassmorphism(
    $color: white,
    $blur-ammount: 8px,
    $color-intensity: 0.4
  );
}
.headline-bar--small {
  padding-top: env(safe-area-inset-top);
  align-items: center;
  h1 {
    font-size: 1.25rem;
  }
}
</style>
