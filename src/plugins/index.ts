/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { registerPinia } from './pinia'
import { registerVuetify } from './vuetify'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  registerVuetify(app)
  registerPinia(app)
}
