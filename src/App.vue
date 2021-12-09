<template>
  <v-app>
    <v-main class="py-0">
      <v-banner
        v-if="deferredPrompt"
        color="primary"
        dark
        class="install-banner text-left"
      >
        Möchten Sie die Mülli-App lokal installieren?
        <template v-slot:actions>
          <v-btn text @click="dismiss" class="rounded-xl">Nein danke</v-btn>
          <v-btn color="white" @click="install" class="rounded-xl black--text">Installieren</v-btn>
        </template>
      </v-banner>
      <router-view />
      <div class="navigation">
        <BottomNavigation class="bottomnav"/>
      </div>
    </v-main>
    <notifications group="default"/>
  </v-app>
</template>

<script>
import BottomNavigation from '@/components/navigation/BottomNavigation'

export default {
  name: 'App',
  metaInfo: {
    title: 'Wie entsorge ich ...?',
    // all titles will be injected into this template
    titleTemplate: '%s | Mülli'
  },
  components: { BottomNavigation },
  data () {
    return {
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
.container {
  margin-bottom: 1.25 * $bottom-navigation-height;
}
.navigation {
  position: relative;
}
.install-banner {
  z-index: 1000;
}
.bottomnav {
  position: absolute;
  bottom: 0;
}
</style>
