<template>
  <v-chip
    v-if="target"
    class="ml-2 elevation-3"
    outlined
    :color="target.color"
    v-html="target.name"
  ></v-chip>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TargetChip',
  props: {
    targetId: {
      type: String,
      required: true
    }
  },
  computed: {
    target () {
      return this.getTargetById(this.targetId)
    },
    ...mapGetters({
      getTargetById: 'Target/getTargetById'
    })
  }
}
</script>
