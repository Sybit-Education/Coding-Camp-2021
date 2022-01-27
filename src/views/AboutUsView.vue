<template>
  <v-container>
    <h1>Über die Mülli-App</h1>
    <section class="my-5">
      <v-row>
        <v-col cols="3">
          <v-img contain :src="require('@/assets/logo.png')" />
        </v-col>
        <v-col cols="9">
          <p>
            Die Mülli-App verwaltet umfangreiche und verifizierte Informationen
            zur Müllentsorgung im Landkreis Konstanz. Das Projekt wird fachlich
            vom
            <router-link to="/partner"
              >Landkreis Konstanz und Partnern</router-link
            >
            aus den Kommunen unterstützt. Technisch wurde das Projekt initial im
            Sybit Coding Camp 2021 entwickelt und vorgestellt. Danach haben die
            Auszubildenden der Firma Sybit die technische Wartung und
            Erweiterung der App übernommen.
          </p>
        </v-col>
      </v-row>

      <div class="mt-5 d-flex">
        <p class="mr-3">
          Die Mülli-App ist eine Open-Source Software. Der
          <a
            href="https://github.com/Sybit-Education/Coding-Camp-2021"
            target="_blank"
            >Quellcode</a
          >
          ist somit öffentlich verfügbar und kann frei genutzt, vervielfältigt
          und verändert werden.
        </p>
        <v-btn
          icon
          href="https://github.com/Sybit-Education/Coding-Camp-2021"
          target="_blank"
          x-large
        >
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </div>
      <p class="mr-3">
        Es gelten die Bedingungen der
        <a
          href="https://github.com/Sybit-Education/Coding-Camp-2021/blob/main/LICENSE"
          target="_blank"
          >MIT-Lizenz</a
        >.
      </p>
      <p>Version: {{ version }}</p>
      <data-reload-button />
    </section>

    <hr class="mt-2 mb-8" />

    <section>
      <h2>Sybit Coding-Camp</h2>
      <p class="mt-2 mb-8">
        Das Sybit Coding-Camp findet jährlich statt und bietet Jugendlichen die
        Chance, einen Einblick in den Beruf von Softwareentwicklerinnen und
        Softwareentwicklern, sowie die Ausbildung als Fachinformatiker:in
        (Anwendungsentwicklung) zu erhalten. Die Auszubildenden des Unternehmens
        bereiten hierfür im Vorfeld ein Projekt vor und coachen die Jugendlichen
        während des Coding-Camps.
      </p>
      <h2 class="mt-5">Was haben wir denn während des Coding-Camps gemacht?</h2>
      <p class="mt-2 mb-8">
        Während des Coding-Camps haben wir die App Mülli gecodet. Wir sind
        insgesamt zehn Schüler und sechs Auszubildende gewesen. Die
        Auszubildenden haben uns vieles über das Programmieren mit Vue,
        JavaScript, HTML und CSS beigebracht. Wir haben uns in vier Gruppen
        aufgeteilt und an den zuvor besprochenen Aufgaben gearbeitet. Uns wurde
        erklärt, wie eine Firma wie Sybit arbeitet. Danach haben uns das
        Sybit-Team die Personas erklärt und vorgestellt. Gegen Ende unserer
        Vorbereitung haben wir vier Personas erstellt und jeweils User Storys
        für diese erstellt.
      </p>
      <h3>Das Team</h3>
      <v-img contain class="mt-2" :src="image"></v-img>
      <div class="mt-2 d-flex">
        <small
          >Stephan Strittmatter (von links), Enrico Franke, Jonas Degener,
          Morries Bieg, Maurice Rehn, Alexander Kugler, Jan Steppacher, Mohammad
          Kalaji, Mirko Pleli, Raphael Schnick, Mario Sieg, Sophia Kunert (von
          unten), Dominik Smyczkowski, Viktor Müller, Niklas Neumann, Gideon
          Godejoann während ihrer Arbeit beim Coding-Camp.</small
        >
      </div>
      <small class="grey--text text--lighten-1"
        >Auf dem Bild fehlt: Brandon Serra, Henrik Schmid (als
        Schülerpraktikum), Cedric Lange</small
      >
    </section>
  </v-container>
</template>

<script>
import DataReloadButton from '@/components/DataReloadButton.vue'
export default {
  name: 'AboutUsView',
  components: { DataReloadButton },
  computed: {
    image () {
      return require('@/assets/img/ueber-uns/team.jpg')
    },
    version () {
      return require('@/../package.json').version
    }
  },
  metaInfo () {
    return {
      title: 'Über uns'
    }
  }
}
</script>
