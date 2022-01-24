<template>
  <v-img class="mb-5 target-image" :src="image" contain :alt="title" />
</template>

<script>
export default {
  name: 'TargetImage',
  props: {
    material: {
      type: Object,
      required: true
    }
  },
  computed: {
    image () {
      if (
        this.material &&
        this.material.targets &&
        this.material.targets[0]?.images
      ) {
        return this.material.targets[0].images[0].thumbnails.large.url
      }
      return "required('https://via.placeholder.com/150?text=placeholder')"
    },
    title () {
      return this.material.targets[0]?.name
    }
  }
}
</script>

<style lang="scss" scoped>
.target-image {
  width: 50%;
  max-width: 280px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
