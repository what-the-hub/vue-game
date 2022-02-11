<template>
  <div id="app">
    <div id="nav">
      <router-link to="/sign-up">Registration</router-link>
      |
      <router-link
        to="/auth">Login
      </router-link>
      |
      <router-link
        to="/game">Game
      </router-link>
    </div>
    <button @click="signOut">logout</button>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { logOut } from '@/api/firebasehelpers'
import 'vue-class-component/hooks'

@Component
export default class App extends Vue {
  signOut () {
    logOut()
    if (this.$route.path !== '/auth') {
      this.$router.push('/auth')
    } else this.$router.push('/')
  }
}
</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50

#nav
  padding: 30px
  text-align: center
  a
    font-weight: bold
    color: #2c3e50

    &.router-link-exact-active
      color: #42b983
</style>
