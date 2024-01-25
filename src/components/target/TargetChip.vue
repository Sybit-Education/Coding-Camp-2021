<template>
  <v-chip
    v-if="target"
    class="ml-2 elevation-3"
    variant="outlined"
    :color="target.color"
  >
    {{ target.name }}
  </v-chip>
</template>

<script lang="ts">
import { useTargetStore } from '@/store/target.store';

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
      const target = useTargetStore().getTargetById(this.targetId)
      return target
    }
  }
}
</script>
