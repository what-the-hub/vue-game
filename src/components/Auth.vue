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
               @blur="$v.email.$touch">

        <div v-if="$v.email.$error" class="error-message">
          <p
            v-if="!$v.email.required"
          >
            Email required
          </p>

          <p
            v-if="!$v.email.email"
          >
            Email must be a well-formed email address
          </p>
        </div>
      </div>

      <div class="mb-3">
        <label for="passInput" class="form-label">Password</label>
        <input type="password"
               class="form-control"
               id="passInput"
               v-model="password"
               @blur="$v.password.$touch">

        <div v-if="$v.password.$error" class="error-message">
          <p
            v-if="!$v.password.required"
          >
            Password required
          </p>

          <p
            v-if="!$v.password.validatePassword "
          >
            Password must contain at least 8 characters (up to 32), 1 number, 1 lower- and uppercase symbol
          </p>
        </div>
      </div>

      <div class="buttons-wrapper">
        <router-link class="action-href" to="/sign-up">Register</router-link>
        <button type="submit"
                class="btn btn-primary"
                @click.prevent="onLogin"
                :disabled="$v.$error || !$v.$dirty"
        >
          Login
        </button>

      </div>

    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { validatePassword } from '@/validators/helpers'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { firebaseSignIn } from '@/api/firebasehelpers'

@Component({
  mixins: [validationMixin],
  validations: {
    password: {
      required,
      validatePassword
    },
    email: {
      required,
      email
    }
  }
})
export default class Auth extends Vue {
  email = ''
  password = ''

  checkEmpty (email: string, pass: string): boolean {
    return email.length > 0 && pass.length > 0
  }

  onLogin (): void {
    firebaseSignIn(this.email, this.password)
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
  p
    margin-top: 10px
    font-size: x-small
    color: red

.buttons-wrapper
  display: flex
  justify-content: space-between

  .action-href
    align-self: flex-end
    text-decoration: none
</style>
