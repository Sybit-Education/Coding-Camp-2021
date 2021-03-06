import Vue from 'vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'
import VueNumber from 'vue-number-animation'
import VueMeta from 'vue-meta'
import VueGtag from 'vue-gtag'
import LoadingSpinner from './components/LoadingSpinner'

Vue.config.productionTip = false
Vue.component('LoadingSpinner', LoadingSpinner)

Vue.use(Notifications)
Vue.use(VueMeta)
Vue.use(VueNumber)
if (process.env.VUE_APP_GTAG_ID !== '') {
  Vue.use(VueGtag, {
    config: { id: 'G-R88JSEDEBT' }
  }, router)
}

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
