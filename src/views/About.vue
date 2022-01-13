<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>{{email}}</h2>
    <h2>{{password}}</h2>
    <router-view name="About"/>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class About extends Vue {
  email = this.$route.params.email
  password = this.$route.params.password
}
</script>
