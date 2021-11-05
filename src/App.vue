<template>
  <v-app>
    <v-main class="py-0">
      <v-banner
        v-if="deferredPrompt"
        color="info"
        dark
        class="text-left"
      >
        Möchten Sie die Mülli-App lokal installieren?
        <template v-slot:actions>
          <v-btn text @click="dismiss">Nein danke</v-btn>
          <v-btn text @click="install">Installieren</v-btn>
        </template>
      </v-banner>
      <router-view />
      <div class="navigation">
      <BottomNavigation class="bottomnav"/>
      </div>
    </v-main>
    <cookie-law :buttonText=buttonText :message="message" theme="royal"></cookie-law>
    <notifications group="default"/>
  </v-app>
</template>

<script>
import BottomNavigation from './components/navigation/BottomNavigation'
import CookieLaw from 'vue-cookie-law'

export default {
  name: 'App',
  components: { BottomNavigation, CookieLaw },
  data () {
    return {
      message: 'Diese Website verwendet Cookies 🍪, um Ihnen die bestmögliche Nutzung unserer Website zu ermöglichen.',
      buttonText: 'Ja, ich akzeptiere',
      deferredPrompt: null
    }
  },
  created () {
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault()
      this.deferredPrompt = event
    })
    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null
    })
  },
  methods: {
    async dismiss () {
      this.deferredPrompt = null
    },
    async install () {
      this.deferredPrompt.prompt()
    }
  }
}
</script>
<style lang="scss">
@import 'src/scss/scrollbar.scss';

.Cookie--royal .Cookie__button {
  background-color: #212121 !important;
  border-radius: 20px !important;

  &:hover {
    background-color: #E91E63 !important;
    transition-duration: 0.4s;
  }
}
.navigation {
  position: relative;
}
.bottomnav {
  position: absolute;
  bottom: 0;
}
</style>
