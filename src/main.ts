import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import { firebaseConfig } from '@/firebaseconfig'
import * as firebase from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuelidate)
firebase.initializeApp(firebaseConfig)
export const db = getFirestore()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
