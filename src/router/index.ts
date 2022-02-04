import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Registration from '@/components/Registration.vue'
import About from '@/views/About.vue'
import Board from '@/components/Board.vue'
import Arrow from '@/gameComponents/Arrow.vue'
import Auth from '@/components/Auth.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sign-up',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/auth',
    name: 'Authorisation',
    component: Auth
  },
  {
    path: '/game',
    name: 'Game',
    component: Board
  },
  {
    path: '/arrow',
    name: 'Arrow',
    component: Arrow
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
