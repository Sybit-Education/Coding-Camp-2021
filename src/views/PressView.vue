<template>
  <v-container>
    <h1 class="mb-5">Presse</h1>
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
    <loading-spinner v-if="showLoadingSpinner"></loading-spinner>
    <v-row>
      <v-col v-for="item in list" :key="item.id" cols="12" xl="6">
        <press-card :item="item" class="mb-5" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import partnerService from '@/services/press.service'
import pressCard from '@/components/press/PressCard.vue'

export default {
  name: 'PartnerView',
  components: { pressCard },
  data () {
    return {
      showLoadingSpinner: true,
      list: []
    }
  },
  metaInfo () {
    return {
      title: 'Presse'
    }
  },
  created () {
    partnerService.getPressRecords().then((list) => {
      this.list = list
      this.showLoadingSpinner = false
    })
  }
}
</script>
