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
      thead-class="cells"
    />
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
      return { date: gotDate, score: value.score }
    }).reverse()
  }
}
</script>

<style scoped lang="sass">
@import 'src/styles/variables'
*
  padding: 0
  margin: 0

.score-wrapper
  max-height: $size-board
  grid-area: score-area
  width: 100%
  box-sizing: border-box
  z-index: 450
  border: 2px solid $cl-borders
  border-radius: 10px

.table
  text-align: center
  position: relative
  height: 100%
  border-radius: 10px
  overflow-y: auto
  background-color: rgba(226, 255, 209, 0.91)
  :not(:first-child)
    border: none

  &::-webkit-scrollbar
    display: none

::v-deep tbody
  tr
    border: none
  td
    border-right: 1px solid $cl-default-button
    border-left: 0 solid $cl-default-button

</style>
