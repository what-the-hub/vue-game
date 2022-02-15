<template>
  <div class="score-wrapper">
    <b-table
      class="table"
      striped
      hover
      sticky-header="100%"
      bordered
      outlined
      :items="scoreList"
    >
    </b-table>
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
    return scoreList.map((value: IFirestoreScore) => {
      const dataOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }
      const gotDate = new Date(value.date).toLocaleString('en-GB', dataOptions)
      console.log(gotDate.toString())
      return { date: gotDate, score: value.score }
    }).reverse()
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
  box-sizing: content-box
  border: 1px solid black

.table
  text-align: center
  position: relative
  height: 1000%
  overflow-y: scroll
</style>
