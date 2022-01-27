import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersistence from 'vuex-persist'
// import the auto exporter
import modules from './modules'
Vue.use(Vuex)

const vuexPersist = new VuexPersistence({
  storage: window.sessionStorage
})

export default new Vuex.Store({
  modules, // all your modules automatically imported :)
  // Making sure that we're doing
  // everything correctly by enabling
  // strict mode in the dev environment.
  strict: process.env.NODE_ENV !== 'production',
  plugins: [vuexPersist.plugin]
})
