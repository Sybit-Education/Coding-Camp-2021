/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
//import 'vuetify/styles'
import '@/styles/main.scss'
import { aliases, fa } from 'vuetify/iconsets/fa-svg'
import { mdi } from 'vuetify/iconsets/mdi'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

// Composables
import { ThemeDefinition, createVuetify } from 'vuetify'
import colors from 'vuetify/util/colors'
import { App } from 'vue'

const light: ThemeDefinition = {
  dark: false,
  colors: {
    primary: colors.amber.darken4, // #FF6F00
    "on-primary": colors.grey.darken4,
    secondary: colors.lightGreen.darken3,
    "on-secondary": colors.grey.darken4,
    anchor: colors.amber.darken4
  }
}

export function registerVuetify(app: App) {
  app.component('font-awesome-icon', FontAwesomeIcon) // Register component globally

  library.add(fas) // Include needed solid icons
  library.add(far) // Include needed regular icons

  app.use(vuetify)
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      fa,
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light,
    },
  },
})
