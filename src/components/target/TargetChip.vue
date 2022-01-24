<template>
  <v-chip
    class="ml-2 elevation-3"
    outlined
    :color="target.color"
    v-html="target.name"
  ></v-chip>
</template>

<script>
export default {
  name: 'TargetChip',
  props: {
    target: {
      type: Object,
      required: true
    }
  }
}
</script>
