<template>
  <v-container>
    <h1 class="text-h3 mb-12 mt-4">Sybit Coding-Camp 2021: Die Mülli-App</h1>
    <h2>
      Was ist das Sybit Coding-Camp?
    </h2>
    <p class="mt-5 d-flex">
      Das Sybit Coding-Camp findet jährlich statt und bietet Jugendlichen die
      Chance, einen Einblick in den Beruf von Softwareentwicklerinnen und
      Softwareentwicklern, sowie die Ausbildung als Fachinformatiker
      (Anwendungsentwicklung) zu erhalten. Die Auszubildenden des Unternehmens
      bereiten hierfür im Vorfeld ein Projekt vor und coachen die Jugendlichen
      während des Coding-Camps.
    </p>
    <h2 class="mt-5 d-flex">
      Was haben wir denn während des Coding-Camps gemacht?
    </h2>
    <p class="mt-5 d-flex">
      Während des Coding-Camps haben die die App Mülli gecodet.
      Wir sind insgesamt zehn Schüler und sechs Auszubildende gewesen.
      Die Auszubildenden haben uns vieles über das Programmieren mit Vue, JavaScript, HTML und CSS beigebracht.
      Wir haben uns in vier Gruppen aufgeteilt und an den zuvor besprochenen Aufgaben gearbeitet.
      Uns wurde erklärt, wie eine Firma wie Sybit arbeitet.
      Danach haben uns das Sybit-Team die Personas erklärt und vorgestellt.
      Gegen Ende unserer Vorbereitung haben wir vier Personas erstellt und jeweils User Storys für diese erstellt.
    </p>
    <h2>
      Das Team
    </h2>
    <v-img contain class="mt-5" :src="image"></v-img>
    <div class="mt-5 d-flex">
      <small>Stephan Strittmatter (von links), Enrico Franke, Jonas Degener, Morries
        Bieg, Maurice Rehn, Alexander Kugler, Jan Steppacher, Mohammad Kalaji,
        Mirko Pleli, Raphael Schnick, Mario Sieg, Sophia Kunert (von unten), Dominik Smyczkowski, Viktor Müller, Niklas
        Neumann, Gideon Godejoann während ihrer Arbeit beim Coding-Camp.</small>
    </div>
    <small>Brandon Serra (fehlt auf dem Bild)</small>
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
