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

      <button type="submit"
              class="btn btn-success"
              @click.prevent="onSubmit"
              :disabled="$v.$error || !$v.$dirty"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { validatePassword } from '@/validators/helpers'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { firebaseAction } from '@/api/firebasehelpers'

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
export default class Registration extends Vue {
  email = ''
  password = ''

  checkEmpty (email: string, pass: string): boolean {
    return email.length > 0 && pass.length > 0
  }

  async onSubmit () {
    await firebaseAction('registration', this.email, this.password)
    await this.$router.push('/game')
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
</style>
