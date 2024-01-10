<template>
  <v-container>
    <headline-bar title="Presse" />

    <p>
      Wir freuen uns über den Anklang, welchen unsere App
      <strong>Mülli</strong> erhält und sind auch ein wenig stolz über die
      Berichterstattung in der Presse.
    </p>
    <p>
      Gerne bieten wir auf
      <a href="mailto:presse@sybit.de">Anfrage</a> Materialien, wie z.B.
      QR-Code, Logo etc. für weitere Berichterstattungen an.
    </p>
    <h2>Artikel zur Mülli-App</h2>
    <loading-spinner v-if="showLoadingSpinner" />
    <v-row>
      <v-col
        v-for="item in list"
        :key="item.id"
        cols="12"
        xl="6"
      >
        <press-card
          :item="item"
          class="mb-5"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import partnerService from '@/services/press.service'
import PressCard from '@/components/press/PressCard.vue'
import HeadlineBar from '@/components/HeadlineBar.vue'
import type Press from '@/types/press'

export default {
  name: 'PressView',
  components: {
    PressCard, HeadlineBar
  },
  data () {
    return {
      showLoadingSpinner: true,
      list: Array<Press>()
    }
  },
  head: {
    title: 'Presse'
  },
  created () {
    partnerService.getPressRecords().then((list) => {
      this.list = list
      this.showLoadingSpinner = false
    })
  }
}
</script>
