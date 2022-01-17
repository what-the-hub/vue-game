<template>
  <div class="wrapper">
    <form>
      <div class="mb-3">
        <label for="mailInput" class="form-label">Email address</label>
        <input type="email"
               class="form-control"
               id="mailInput"
               aria-describedby="emailHelp"
               v-model="email"
               @change="checkEmail">
        <p
          class="error-message"
          v-if="!errorEmail"
        >
          Something wrong with your e-mail, check it please
        </p>
      </div>

      <div class="mb-3">
        <label for="passInput" class="form-label">Password</label>
        <input type="password"
               class="form-control"
               id="passInput"
               v-model="password"
               @change="checkPassword">
      </div>
      <p
        v-if="!errorPassword"
        class="error-message"
      >
        Password must contain at least 8 characters, 1 number, 1 lower- and uppercase symbol
      </p>

      <button type="submit"
              class="btn btn-primary"
              @click="showEmail"
              :disabled="isDisabledButton"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Errors, UserInputData } from '@/types'
import { validateEmail, validatePassword } from '@/validators/helpers'

@Component
export default class Registration extends Vue {
  email = ''
  password = ''

  isDisabled = true

  errors: Errors = { emailEr: true, passwordEr: true }

  checkEmpty (email: string, pass: string): boolean {
    return email.length > 0 && pass.length > 0
  }

  showEmail (): void {
    this.isDisabled = false

    this.$router.push({
      name: 'About',
      params: { email: this.email, password: this.password }
    })
  }

  checkEmail () {
    this.errors.emailEr = validateEmail(this.email)
  }

  checkPassword () {
    this.errors.passwordEr = validatePassword(this.password)
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

  get errorEmail () {
    return this.errors.emailEr
  }

  get errorPassword () {
    return this.errors.passwordEr
  }
}
</script>

<style scoped lang="sass">
.wrapper
  width: 500px
  margin: 0 auto

label
  float: left

.error-message
  font-size: x-small
  color: red
</style>
