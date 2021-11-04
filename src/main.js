import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuetify from 'vuetify/lib'
import Notifications from 'vue-notification'
import VueSimpleMarkdown from 'vue-simple-markdown'
import 'vue-simple-markdown/dist/vue-simple-markdown.css'
import VueMeta from 'vue-meta'
import LoadingSpinner from './components/LoadingSpinner'

Vue.config.productionTip = false
Vue.component('LoadingSpinner', LoadingSpinner)

Vue.use(Vuetify)
Vue.use(Notifications)
Vue.use(VueSimpleMarkdown)
Vue.use(VueMeta)

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#FF6F00',
        onprimary: '#212121',
        secondary: '#558B2F',
        onsecondary: '#212121',
        anchor: '#E1007A'
      }
    }
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
