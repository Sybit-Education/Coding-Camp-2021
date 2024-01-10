<template>
  <v-img
    v-if="material"
    class="mb-5 target-image"
    :src="image"
    cover
    :alt="title"
  />
</template>

<script lang="ts">
import { useTargetStore } from '@/store/target.store'

export default {
  name: 'TargetImage',
  props: {
    material: {
      type: Object,
      required: true
    }
  },
  computed: {
    firstTarget () {
      if (this.material && this.material.targets[0]) {
        const target = useTargetStore().getTargetById(this.material.targets[0])
        return target
      } else {
        return null
      }
    },
    image () {
      if (this.firstTarget) {
        const target = this.firstTarget
        return target.images[0].thumbnails?.large.url
      }
      return "required('https://via.placeholder.com/150?text=placeholder')"
    },
    title () {
      if (this.firstTarget) {
        return this.firstTarget.name
      } else {
        return undefined
      }
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
