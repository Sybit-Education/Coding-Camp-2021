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
    <notifications group="default"/>
    <vue-cookie-first :api-key="cookieFirstKey" :banner-style="cookieFirstStyle" />
  </v-app>
</template>

<script>
import BottomNavigation from '@/components/navigation/BottomNavigation'
import VueCookieFirst from 'vue-cookie-first'

export default {
  name: 'App',
  components: { BottomNavigation, VueCookieFirst },
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
.navigation {
  position: relative;
}

.bottomnav {
  position: absolute;
  bottom: 0;
}
</style>
