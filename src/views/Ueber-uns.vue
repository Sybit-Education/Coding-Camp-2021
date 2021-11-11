<template>
  <v-container>
    <h1 class="mt-5 d-flex justify-center">Coding-Camp 2021</h1>
    <h2 class="mt-5 d-flex justify-center">
      Was genau ist eigentlich das Coding-Camp?
    </h2>
    <h4 class="mt-5 d-flex justify-center">
      Das Sybit Coding-Camp findet jährlich statt und bietet interessierten
      Jugendlichen die Chance die Ausbildung als Fachinformatiker
      (Anwendungsentwicklung) und den Beruf des Softwareentwicklers genauer
      kennenzulernen. Die Auszubildenden der Firma Sybit bereiten
      hierfür im Vorfeld ein Coding-Projekt für die einwöchige Veranstaltung vor
      und unterstützen dann die Teilnehmenden Jugendlichen bei ihrer Arbeit
      während des Camps.
    </h4>
    <h2 class="mt-5 d-flex justify-center">
      Was haben wir während des Coding-Camps gemacht?
    </h2>
    <h4 class="mt-5 d-flex justify-center">
      Während des Coding-Camps lernten wir vieles über das Programmieren mit Vue, JavaScript, HTML und CSS.
      Gemeinsam mit den Auszubildenden codeten und entwickelten wir die App "Mülli", eine App, die Nutzer unterstützt ihren
      Müll zu trennen und vor allem an den richtigen Orten zu entsorgen.
      Nach einer Gruppeneinteilung wurde uns das "Persona-Modell" erklärt und
      vorgestellt, welche einen Prototyp für eine Gruppe von Nutzern, mit konkret
      ausgeprägten Eigenschaften und einem konkreten Nutzungsverhalten darstellt.
      Auch Sybit arbeitet mit solch einem Modell, um ihre Produkte
      und Services bedarfs- und zielgruppenspezifisch zu entwickeln.
      Auch uns unterstützte das Modell der "Personas" sehr, weil wir so anhand der
      ausgedachten User-Storys der "Personas" unsere Ideen zum Projekt "Mülli" nochmals
      überarbeiten und abändern konnten.
      So entwickelten wir erfolgreich unsere eigene App zur Müllentsorgung.
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
