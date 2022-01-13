<template>
  <div class="wrapper">
    <form>
      <div class="mb-3">
        <label for="mailInput" class="form-label">Email address</label>
        <input type="email"
               class="form-control"
               id="mailInput"
               aria-describedby="emailHelp"
               v-model="email">
      </div>

      <div class="mb-3">
        <label for="passInput" class="form-label">Password</label>
        <input type="password"
               class="form-control"
               id="passInput"
               v-model="password">
      </div>

      <button type="submit"
              class="btn btn-primary"
              @click="showEmail"
              :disabled="isDisabledButton"
      >
        Submit
      </button>

      <div v-if="!isDataEmpty">
        <h3>EMAIL: {{ receivedEmail }}</h3>
        <h3>PASSWORD: {{ receivedPassword }}</h3>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { UserInputData } from '@/types'

@Component
export default class Registration extends Vue {
  email = ''
  password = ''

  receivedEmail = ''
  receivedPassword = ''

  isDataEmpty = true
  isDisabled = true
  checkEmpty (email: string, pass: string): boolean {
    return email.length > 0 && pass.length > 0
  }

  get inputData (): UserInputData {
    return { email: this.email, password: this.password }
  }

  get isDisabledButton (): boolean {
    const { email, password } = this.inputData
    if (this.checkEmpty(email, password)) {
      return !this.isDisabled
    }
    return this.isDisabled
  }

  showEmail (): void {
    this.receivedEmail = this.email
    this.receivedPassword = this.password
    this.isDataEmpty = false
    this.isDisabled = false

    this.$router.push({
      name: 'About',
      params: { email: this.receivedEmail, password: this.receivedPassword }
    })
  }
}

</script>

<style scoped lang="sass">
.wrapper
  width: 500px
  margin: 0 auto

label
  float: left
</style>
