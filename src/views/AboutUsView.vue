<template>
  <v-container>
    <headline-bar title="Über die Mülli-App" />
    <section class="my-5">
      <v-row>
        <v-col cols="3">
          <v-img
            cover
            :src="logo"
          />
        </v-col>
        <v-col cols="9">
          <p>
            Die Mülli-App verwaltet umfangreiche und verifizierte Informationen
            zur Müllentsorgung im Landkreis Konstanz. Das Projekt wird fachlich
            vom
            <router-link to="/partner">
              Landkreis Konstanz und Partnern
            </router-link>
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
          >Quellcode</a>
          ist somit öffentlich verfügbar und kann frei genutzt, vervielfältigt
          und verändert werden.
        </p>
        <v-btn
          icon
          href="https://github.com/Sybit-Education/Coding-Camp-2021"
          target="_blank"
          size="x-large"
        >
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </div>
      <p class="mr-3">
        Es gelten die Bedingungen der
        <a
          href="https://github.com/Sybit-Education/Coding-Camp-2021/blob/main/LICENSE"
          target="_blank"
        >MIT-Lizenz</a>.
      </p>
      <p>Version: {{ version }}</p>
      <data-reload-button />
    </section>

    <hr class="mt-2 mb-8">

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
      <h2 class="mt-5">
        Was haben wir denn während des Coding-Camps gemacht?
      </h2>
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
      <v-img
        cover
        class="mt-2"
        :src="image"
      />
      <div class="mt-2 d-flex">
        <small>
          Während ihrer Arbeit beim Coding-Camp - erste Reihe (v.l.n.r): Sophia
          Kunert, Dominik Smyczkowski, Viktor Müller, Niklas Neumann, Gideon
          Godejoann<br>
          stehend: Stephan Strittmatter, Enrico Franke, Jonas Degener, Morries
          Bieg, Maurice Rehn, Alexander Kugler, Jan Steppacher, Mohammad Kalaji,
          Mirko Pleli, Raphael Schnick, Mario Sieg
        </small>
      </div>
    </section>
  </v-container>
</template>

<script setup lang="ts">
import HeadlineBar from '@/components/HeadlineBar.vue'
import DataReloadButton from '@/components/DataReloadButton.vue'
import { useHead } from '@unhead/vue'
import logo from '/img/logo.png'
import image from '/img/ueber-uns/team.jpg'

const version = import.meta.env.PACKAGE_VERSION

useHead({
  title: 'Über uns'
})
</script>
