import { createPinia } from "pinia"
import { App } from "vue"

export const pinia = createPinia()

export function registerPinia(app: App) {
  app.use(pinia as any)
}
