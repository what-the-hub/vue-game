<template>
  <div>
    <div id="app">
      <div id="nav">
        <router-link to="/sign-up">Registration</router-link>
        <router-link to="/auth">Login</router-link>
        <router-link to="/game">Game</router-link>
      </div>
      <div class="button-wrapper">
        <button
          v-if="this.$store.state.userStore.user"
          @click="signOut"
          class="btn btn-primary btn-sm"
        >
          Log Out
        </button>
        <button
          v-if="!this.$store.state.userStore.user"
          @click="redirectRoute"
          class="btn btn-primary btn-sm"
        >
          Log In
        </button>
      </div>
    </div>
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
  signOut (): void {
    logOut()
    this.redirectRoute()
  }

  redirectRoute (): void {
    if (this.$route.path !== '/auth') {
      this.$router.push('/auth')
    } else this.$router.push('/')
  }
}
</script>

<style scoped lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  display: flex
  justify-content: space-between
  align-items: center

.button-wrapper
  padding: 10px

#nav
  padding: 10px
  a
    margin-right: 10px
    font-weight: bold
    color: #2c3e50

    &.router-link-exact-active
      color: #42b983
</style>
