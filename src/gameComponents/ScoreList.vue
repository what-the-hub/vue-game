<template>
  <div class="score-wrapper">
    <b-table striped hover :items="scoreList"></b-table>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import 'vue-class-component/hooks'
import { StoreModuleEnum } from '@/store/types'
import { EActionUser } from '@/store/modules/user/typesUser'
import { IFirestoreScore } from '@/types'

@Component
export default class ScoreList extends Vue {
  async mounted () {
    await this.$store.dispatch(
      `${StoreModuleEnum.userStore}/${EActionUser.GET_DB_SCORE}`
    )
  }

  get scoreList () {
    const scoreList = this.$store.state.userStore.scoreFromDB
    console.log(scoreList)
    return scoreList.map((value: IFirestoreScore) => {
      return { date: value.date + '&&&', score: value.score }
    })
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
