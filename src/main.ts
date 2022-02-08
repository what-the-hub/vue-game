import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { firebaseConfig } from '@/firebaseconfig'
import firebase from 'firebase/compat'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuelidate)
firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
