import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/HomeView.vue')
  },
  {
    path: '/detail/:id',
    props: true,
    name: 'DetailPage',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/DetailView.vue')
  },
  {
    path: '/karte',
    name: 'Karte',
    props: true,
    component: () =>
      import(/* webpackChunkName: "map" */ '../views/MapView.vue')
  },
  {
    path: '/problemstoffmobil',
    name: 'Problemstoffmobil',
    component: () =>
      import(/* webpackChunkName: "problemmobil" */ '../views/ProblemstoffmobilView.vue'),
    props: true
  },
  {
    path: '/datenschutz',
    name: 'Datenschutz',
    component: () =>
      import(/* webpackChunkName: "impressum" */ '../views/PrivacyView.vue')
  },
  {
    path: '/impressum',
    name: 'Impressum',
    component: () =>
      import(/* webpackChunkName: "impressum" */ '../views/ImpressumView.vue')
  },
  {
    path: '/ueber-uns',
    name: 'Ueber-uns',
    component: () =>
      import(/* webpackChunkName: "impressum" */ '../views/AboutUsView.vue')
  },
  {
    path: '/partner',
    name: 'Partner',
    component: () =>
      import(/* webpackChunkName: "partner" */ '../views/PartnerView.vue')
  },
  {
    path: '/tipps',
    name: 'Tipps',
    component: () =>
      import(/* webpackChunkName: "tipps" */ '../views/TipsListView.vue')
  },
  {
    path: '/tipps/:tipId',
    props: true,
    name: 'TipDetail',
    component: () =>
      import(/* webpackChunkName: "tipps" */ '../views/TipView.vue')
  },
  {
    path: '/presse',
    name: 'Press',
    component: () =>
      import(/* webpackChunkName: "press" */ '../views/PressView.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "not-found" */ '../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return {
            selector: to.hash
          }
        })
      }, 500)
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

export default router
