<template>
  <div class="headline-bar mb-5">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HeadlineBar',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.headline-bar {
  padding-top: env(safe-area-inset-top);
  display: flex;
  flex-direction: column;
  align-items: left;
  position: sticky;
  top: 0;
  z-index: 1020;

  @include glassmorphism(
    $color: white,
    $blur-ammount: 8px,
    $color-intensity: 0.4
  );
}
</style>
