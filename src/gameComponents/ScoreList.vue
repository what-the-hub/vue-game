<template>
  <div class="score-wrapper">
    {{newScoreList}}
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import 'vue-class-component/hooks'
import { StoreModuleEnum } from '@/store/types'
import { EActionUser } from '@/store/modules/user/typesUser'

@Component
export default class ScoreList extends Vue {
  async mounted () {
    await this.$store.dispatch(
      `${StoreModuleEnum.userStore}/${EActionUser.GET_DB_SCORE}`
    )
  }

  get newScoreList () {
    return this.$store.state.userStore.scoreFromDB
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
