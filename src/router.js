import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './views/Home.vue'
import GigExplore from './views/GigExplore.vue'
import GigDetails from './views/GigDetails.vue'
import SellerProfile from './views/SellerProfile.vue'
import UserDetails from './views/UserDetails.vue'
import GigEdit from './views/GigEdit.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/explore',
    name: 'GigExplore',
    component: GigExplore,
  },
  {
    path: '/details/:gigId',
    name: 'GigDetails',
    component: GigDetails,
  },
  {
    path: '/login',
    name: 'LoginSignup',
    component: LoginSignup,
  },
  {
    path: '/user/:id',
    name: 'UserDetails',
    component: UserDetails,
  },
  {
    path: '/seller/profile',
    name: 'SellerProfile',
    component: SellerProfile,
  },
]

export const router = createRouter({
  routes,
  history: createWebHashHistory(),
  // base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80,
      }
    }
  },
})
