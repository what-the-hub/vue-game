<template>
  <div class="score-wrapper">
    <button style="margin-top: 80px" @click="getDataDB">stop</button>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import 'vue-class-component/hooks'
import { getDB, onChange, updateUserDB } from '@/api/DBFirebaseHelpers'

@Component
export default class ScoreList extends Vue {
  mounted () {
    onChange()
  }

  async getDataDB () {
    await getDB()
    await updateUserDB()
    // await addUser()
  }
}
</script>

<style scoped lang="sass">
*
  padding: 0
  margin: 0

.score-wrapper
  position: relative
  width: 30%
  height: 100%
  background-color: aqua
</style>
