<template>
  <v-container>
    <h1 class="mt-5 d-flex justify-center">Vom Coding-Camp 2021 Entwickelt</h1>
    <h2 class="mt-5 d-flex justify-center">
      Was ist denn Überhaupt das Coding-Camp?
    </h2>
    <h4 class="mt-5 d-flex justify-center">
      Das Sybit Coding-Camp findet jährlich statt und bietet Jugendlichen die
      Chance, einen Einblick in den Beruf von Softwareentwicklerinnen und
      Softwareentwickler sowie die Ausbildung als Fachinformatiker
      (Anwendungsentwicklung) zu erhalten. Die Auszubildenden des Unternehmens
      bereiten hierfür im Vorfeld ein Projekt vor und coachen die Jugendlichen
      während des Coding Camps.
    </h4>
    <h2 class="mt-5 d-flex justify-center">
      Was haben wir denn während des Coding-Camps gemacht?
    </h2>
    <h4>
      Während des Coding-Camps codeten wir die App Mülli. Wir waren insgesamt
      zehn Praktikanten,/Schüler und sechs Auszubildende. Diese brachten uns
      vieles über das Coden bei mit Vue, Java, JavaScript, HTML und CSS bei. Wir
      teilten uns in vier Gruppen und arbeiteten zusammen an, denn Aufgaben, die
      wir vorher besprochen hatten. Uns wurde erklärt, wie so eine Firma wie
      Sybit arbeitet uns wurden die Personas erklärt und vorgestellt. Am Ende
      erstellten wir vier Personas. Wir besprachen noch mal alle Ideen und
      erstellten User Storys über unsere Personas.
    </h4>
    <v-img contain class="mt-10" :src="image"></v-img>
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
