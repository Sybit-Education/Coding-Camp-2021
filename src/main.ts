/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import { registerPlugins } from '@/plugins'
import { VueHeadMixin, createHead } from '@unhead/vue'
import L from 'leaflet'

import App from './App.vue'
import router from "./router"

import { createApp } from 'vue'

const app = createApp(App)

app.provide('L', L)

app.mixin(VueHeadMixin)

app.use(router as any)
app.use(createHead() as any)

registerPlugins(app)

router.isReady().then(() => {
  app.mount('#app')
})
