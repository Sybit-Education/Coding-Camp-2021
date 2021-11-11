<template>
  <v-container>
    <h1>Sybit Coding-Camp 2021: Die Mülli-App</h1>
    <h2>
      Was ist das Sybit Coding-Camp?
    </h2>
    <p class="mt-5 d-flex">
      Das Sybit Coding-Camp findet jährlich statt und bietet Jugendlichen die
      Chance, einen Einblick in den Beruf von Softwareentwicklerinnen und
      Softwareentwickler sowie die Ausbildung als Fachinformatiker
      (Anwendungsentwicklung) zu erhalten. Die Auszubildenden des Unternehmens
      bereiten hierfür im Vorfeld ein Projekt vor und coachen die Jugendlichen
      während des Coding-Camps.
    </p>
    <h2 class="mt-5 d-flex">
      Was haben wir denn während des Coding-Camps gemacht?
    </h2>
    <p class="mt-5 d-flex">
      Während des Coding-Camps codeten wir die App Mülli. Wir waren insgesamt
      zehn Schüler und sechs Auszubildende. Die Auszubildenden brachten uns
      vieles über das Programmieren bei mit Vue, JavaScript, HTML und CSS bei. Wir
      teilten uns in vier Gruppen und arbeiteten zusammen an, denn Aufgaben, die
      wir vorher besprochen hatten. Uns wurde erklärt, wie eine Firma wie
      Sybit arbeitet: uns wurden die Personas erklärt und vorgestellt. Am Ende
      erstellten wir vier Personas. Wir besprachen nochmal alle Ideen und
      erstellten User Storys über unsere Personas.
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
    <br>
    <br>
      <small> Die Mülli-App ist eine Open-Source Software. Der Quellcode ist somit öffentlich verfügbar und kann frei genutzt,
        vervielfältigt und verändert werden. (https://github.com/Sybit-Education/Coding-Camp-2021)<br>
        Es gelten die Bedingungen der MIT-Lizenz. (https://github.com/Sybit-Education/Coding-Camp-2021/blob/main/LICENSE)</small>
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
