/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
//import 'vuetify/styles'
import '@/styles/main.scss'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'

// Composables
import { ThemeDefinition, createVuetify } from 'vuetify'
import colors from 'vuetify/util/colors'

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


// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
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
