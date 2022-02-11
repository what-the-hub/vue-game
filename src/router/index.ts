import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Registration from '@/components/Registration.vue'
import Board from '@/components/Board.vue'
import Auth from '@/components/Auth.vue'
import { checkUser, isAnyUserLoggedIn } from '@/api/firebasehelpers'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Auth
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const isUserLogged: boolean = await isAnyUserLoggedIn()
  checkUser()
  if (to.name === 'Game' && !isUserLogged) {
    console.log('not logged user')
    next('auth')
  }
  next()
})

export default router
