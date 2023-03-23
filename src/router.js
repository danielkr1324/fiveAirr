import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './views/Home.vue'
import GigList from './views/GigList.vue'
import LoginSignup from './views/LoginSignup.vue'
import UserDetails from './views/UserDetails.vue'
import GigDetails from './views/GigDetails.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/explore',
    name: 'GigList',
    component: GigList,
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
]

export const router = createRouter({
  routes,
  history: createWebHashHistory(),
  // base: process.env.BASE_URL,
})
