<template>
  <v-app>
    <v-main>
      <v-banner
        v-if="deferredPrompt"
        color="primary"
        dark
        class="install-banner text-left"
      >
        Möchten Sie die Mülli-App installieren?
        <template #actions>
          <v-btn
            class="rounded-xl"
            @click="dismiss"
          >
            Nein, danke.
          </v-btn>
          <v-btn
            variant="outlined"
            class="rounded-xl text-black"
            @click="install"
          >
            Installieren
          </v-btn>
        </template>
      </v-banner>
      <router-view />
    </v-main>
    <nav class="navigation">
      <bottom-navigation />
    </nav>
    <VSonner :duration="10000" />
  </v-app>
</template>

<script setup lang="ts">
import BottomNavigation from '@/components/navigation/BottomNavigation.vue'
import { ref } from 'vue';
import { useHead } from '@unhead/vue'
import { VSonner } from 'vuetify-sonner'

useHead({
  title: 'Wie entsorge ich ...?',
  titleTemplate: '%s | Mülli-App',
  meta: [
    {
      name: 'description',
      content: 'Mülli App'
    },
    {
      name: 'keywords',
      content: 'Müll, Entsorgung, Problemstoffe, Abfall, Landkreis Konstanz, Mülli App'
    },
    {
      name: 'author',
      content: 'Sybit coding Camp 2021 team'
    },
    {
      name: 'og:title',
      content: 'Mülli App'
    },
    {
      name: 'og:description',
      content: 'App für die Entsorgung von Müll im Landkreis Konstanz'
    },
    {
      name: 'og:url',
      content: 'https://muelli.app'
    },
    {
      name: 'twitter:title',
      content: 'Mülli App'
    },
    {
      name: 'twitter:description',
      content: 'App für die Entsorgung von Müll im Landkreis Konstanz'
    },
    {
      name: 'twitter:card',
      content: 'Mülli App'
    }
  ]
})


interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
window.addEventListener("beforeinstallprompt", (_e) => {}); // _e is now typed as BeforeInstallPromptEvent
const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null)

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault()
  deferredPrompt.value = event
})
window.addEventListener('appinstalled', () => {
  deferredPrompt.value = null
})

const install = () => {
  deferredPrompt.value?.prompt()
}
const dismiss = () => {
  deferredPrompt.value = null
}
</script>
<style lang="scss">
.container {
  margin-bottom: 1.25 * $bottom-navigation-height;
}
.install-banner {
  z-index: 1000;
}
</style>
