<template>
  <v-container>
    <h1 class="grey--text text--darken-4 text-h4 text-md-h3 font-weight-bold mb-8 mt-4">Sybit Coding-Camp 2021: Die Mülli-App</h1>
    <h2 class="grey--text text--darken-3">
      Was ist das Sybit Coding-Camp?
    </h2>
    <p class="mt-2 mb-8 grey--text text--darken-1">
      Das Sybit Coding-Camp findet jährlich statt und bietet Jugendlichen die
      Chance, einen Einblick in den Beruf von Softwareentwicklerinnen und
      Softwareentwicklern, sowie die Ausbildung als Fachinformatiker
      (Anwendungsentwicklung) zu erhalten. Die Auszubildenden des Unternehmens
      bereiten hierfür im Vorfeld ein Projekt vor und coachen die Jugendlichen
      während des Coding-Camps.
    </p>
    <h2 class="mt-5 grey--text text--darken-3">
      Was haben wir denn während des Coding-Camps gemacht?
    </h2>
    <p class="mt-2 mb-8 grey--text text--darken-1">
      Während des Coding-Camps haben die die App Mülli gecodet.
      Wir sind insgesamt zehn Schüler und sechs Auszubildende gewesen.
      Die Auszubildenden haben uns vieles über das Programmieren mit Vue, JavaScript, HTML und CSS beigebracht.
      Wir haben uns in vier Gruppen aufgeteilt und an den zuvor besprochenen Aufgaben gearbeitet.
      Uns wurde erklärt, wie eine Firma wie Sybit arbeitet.
      Danach haben uns das Sybit-Team die Personas erklärt und vorgestellt.
      Gegen Ende unserer Vorbereitung haben wir vier Personas erstellt und jeweils User Storys für diese erstellt.
    </p>
    <h2 class="grey--text text--darken-3">
      Das Team
    </h2>
    <v-img contain class="mt-2" :src="image"></v-img>
    <div class="mt-2 d-flex grey--text text--darken-1">
      <small>Stephan Strittmatter (von links), Enrico Franke, Jonas Degener, Morries
        Bieg, Maurice Rehn, Alexander Kugler, Jan Steppacher, Mohammad Kalaji,
        Mirko Pleli, Raphael Schnick, Mario Sieg, Sophia Kunert (von unten), Dominik Smyczkowski, Viktor Müller, Niklas
        Neumann, Gideon Godejoann während ihrer Arbeit beim Coding-Camp.</small>
    </div>
    <small class="grey--text text--lighten-1">Brandon Serra (fehlt auf dem Bild)</small>
  </v-container>
</template>

<script>
export default {
  computed: {
    image () {
      return require('@/assets/img/ueber-uns/team.jpg')
    }
  }
}
</script>
