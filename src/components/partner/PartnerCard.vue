<template>
  <v-card :id="partner.id" class="rounded-xl">
    <v-row>
      <v-col sm="4" cols="12">
        <a
          v-if="imageSource"
          :href="partner.website"
          target="_blank"
          rel="noopener noreferrer"
        >
          <v-img class="mx-1" :src="imageSource" />
        </a>
      </v-col>
      <v-col sm="8" cols="12">
        <v-card-title>
          <h3>{{ partner.name }}</h3>
        </v-card-title>
        <v-card-text>
          <markdown-wrapper v-if="partner.notes" :source="partner.notes" />
          <a :href="partner.website" target="_blank" rel="noopener noreferrer">
            {{ partner.website }}
          </a>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import MarkdownWrapper from '@/components/MarkdownWrapper.vue'

export default {
  name: 'PartnerCard',
  components: { MarkdownWrapper },
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
