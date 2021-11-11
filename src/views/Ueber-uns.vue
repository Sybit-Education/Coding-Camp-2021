<template>
  <v-container>
    <h1>Sybit Coding-Camp 2021: Die Mülli-App</h1>
    <h2>
      Was ist das Sybit Coding-Camp?
    </h2>
    <p>
      Das Sybit Coding-Camp findet jährlich statt und bietet Jugendlichen die
      Chance, einen Einblick in den Beruf von Softwareentwicklerinnen und
      Softwareentwickler sowie die Ausbildung als Fachinformatiker
      (Anwendungsentwicklung) zu erhalten. Die Auszubildenden des Unternehmens
      bereiten hierfür im Vorfeld ein Projekt vor und coachen die Jugendlichen
      während des Coding-Camps.
    </p>
    <h2>
      Was haben wir denn während des Coding-Camps gemacht?
    </h2>
    <p>
      Während des Coding-Camps codeten wir die App Mülli. Wir waren insgesamt
      zehn Schüler und sechs Auszubildende. Die Auszubildenden brachten uns
      vieles über das Programmieren bei mit Vue, JavaScript, HTML und CSS bei. Wir
      teilten uns in vier Gruppen und arbeiteten zusammen an, denn Aufgaben, die
      wir vorher besprochen hatten. Uns wurde erklärt, wie eine Firma wie
      Sybit arbeitet: uns wurden die Personas erklärt und vorgestellt. Am Ende
      erstellten wir vier Personas. Wir besprachen nochmal alle Ideen und
      erstellten User Storys über unsere Personas.
    </p>
    <v-img contain class="mt-10" :src="image" />
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
