<template>
    <v-btn
        :to="to"
        fab
        small
        top
        left
        fixed
        class="back-button mt-3"
        >
        <v-icon style="font-size:25px">
            mdi-arrow-left
        </v-icon>
    </v-btn>
</template>
<script>
export default {
  name: 'BackButton',
  props: {
    to: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
.back-button {
    background: rgba(255, 255, 255, 0.4) !important;
}
</style>