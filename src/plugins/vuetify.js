import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.amber.darken4, // #FF6F00
        onprimary: colors.grey.darken4,
        secondary: colors.lightGreen.darken3,
        onsecondary: colors.grey.darken4,
        anchor: colors.amber.darken4
      }
    }
  }
})
