<template>
<v-card
    class="mx-auto"
    max-width="365"
  >
    <v-card-title>
      {{ tipp.title }}
    </v-card-title>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          <vue-simple-markdown :source="tipp.article" />
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: 'TypeCard',
  props: {
    tipp: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    show: false
  })
}
</script>

<style></style>
