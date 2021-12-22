<template>
  <v-card class="rounded-xl">
    <a
      v-if="imageSource"
      :href="partner.website"
      target="_blank"
      rel="noopener noreferrer"
    >
      <v-img :src="imageSource" />
    </a>
    <v-card-title>
      {{ partner.name }}
    </v-card-title>
    <v-card-text>
      <markdown v-if="partner.notes" :source="partner.notes" />
      <a :href="partner.website" target="_blank" rel="noopener noreferrer">
        {{ partner.website }}
      </a>
    </v-card-text>
  </v-card>
</template>

<script>
import Markdown from '@/components/Markdown.vue'

export default {
  name: 'PartnerCard',
  components: { Markdown },
  props: {
    partner: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageSource () {
      if (this.partner?.logo?.length) {
        return this.partner.logo[0].url
      }
      return null
    }
  }
}
</script>
