import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/detail/:id',
    props: true,
    name: 'DetailPage',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/DetailPage.vue')
  },
  {
    path: '/karte',
    name: 'Karte',
    component: () =>
      import(/* webpackChunkName: "map" */ '../views/Map.vue'),
    props: true
  },
  {
    path: '/problemstoff-sammeltermine',
    name: 'Problemstoffmobil',
    component: () =>
      import(/* webpackChunkName: "map" */ '../views/Problemstoffmobil.vue'),
    props: true
  },
  {
    path: '/datenschutz',
    name: 'Datenschutz',
    component: () =>
      import(/* webpackChunkName: "datenschutz" */ '../views/Datenschutz.vue')
  },
  {
    path: '/impressum',
    name: 'Impressum',
    component: () =>
      import(/* webpackChunkName: "impressum" */ '../views/Impressum.vue')
  },
  {
    path: '/ueber-uns',
    name: 'Ueber-uns',
    component: () =>
      import(/* webpackChunkName: "impressum" */ '../views/Ueber-uns.vue')
  },
  {
    path: '/partner',
    name: 'Partner',
    component: () =>
      import(/* webpackChunkName: "partner" */ '../views/Partner.vue')
  },
  {
    path: '/tipps',
    name: 'Tipps',
    component: () =>
      import(/* webpackChunkName: "tipps" */ '../views/TipsList.vue')
  },
  {
    path: '/tipps/:tipId',
    props: true,
    name: 'TipDetail',
    component: () =>
      import(/* webpackChunkName: "tips" */ '../views/Tip.vue')
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
