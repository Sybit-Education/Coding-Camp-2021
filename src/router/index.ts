import { createRouter, createWebHistory } from "vue-router";
import { useMaterialStore } from '@/store/material.store'
import { useTargetStore } from '@/store/target.store'
import { useTipStore } from '@/store/tip.store'
import { useLocationStore } from '@/store/location.store'

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
    path: "/:catchAll(.*)", // Unrecognized path automatically matches 404
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "not-found" */ '../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth',
        }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ left: 0, top: 0 })
        }, 500)
      })
    }
  },
  routes
})

router.beforeEach((to) => {
  // ✅ This will work make sure the correct store is used for the
  // current running app
  useMaterialStore().getMaterialRecords()
  useTargetStore().getTargetRecords()
  useTipStore().getTipRecords()
  useLocationStore().getLocationRecords()
})

export default router
