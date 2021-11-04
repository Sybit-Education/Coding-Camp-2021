import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/detail/:id',
    name: 'DetailPage',
    component: () =>
      import('../views/DetailPage.vue')
  },
  {
    path: '/karte',
    name: 'Karte',
    component: () =>
      import(/* webpackChunkName: "map" */ '../views/Map.vue'),
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
    path: '/tipps',
    name: 'Tipps',
    component: () =>
      import(/* webpackChunkName: "tipps" */ '../views/Tipps.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
