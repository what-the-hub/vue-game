<template>
  <div :id="itemInfo.id" :class="itemInfo.direction">
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
// import { EActionArrow } from '@/store/modules/arrow/typesArrow'
import { EActionScore } from '@/store/modules/score/typesScore'
import { StoreModuleEnum } from '@/store/types'
import { EActionArrow, EGetterArrow, IArrowData } from '@/store/modules/arrow/typesArrow'

@Component
export default class Arrow extends Vue {
  arrowData!: IArrowData

  created () {
    this.arrowData = this.$store.getters[`${StoreModuleEnum.arrowStore}/${EGetterArrow.GET_LAST_ITEM}`] // for last added item in array
  }

  mounted () {
    this.$el.addEventListener('animationend', () => {
      this.deleteLastArrow()
      this.$destroy()
    })
  }

  deleteLastArrow () {
    this.$store.dispatch(`${StoreModuleEnum.arrowStore}/${EActionArrow.DELETE_ARROW}`)
  }

  get itemInfo (): IArrowData {
    return {
      id: this.arrowData.id,
      direction: this.arrowData.direction
    }
  }

  setScore (point: number): void {
    this.$store.dispatch(`${StoreModuleEnum.scoreStore}/${EActionScore.SET_POINTS}`, point)
  }
}
</script>

<style scoped lang="sass">
.left-arrow
  background-color: rgb(255, 0, 0)
  width: 20px
  height: 20px
  position: absolute
  z-index: 10
  top: 0
  left: 20px
  animation: block 5s linear

.left-arrow::before
  content: ''
  border-top: 10px solid transparent
  border-bottom: 10px solid transparent
  border-right: 10px solid blue
  position: absolute
  right: 5px

.up-arrow
  background-color: rgb(255, 0, 0)
  width: 20px
  height: 20px
  position: absolute
  z-index: 10
  top: 0
  left: 200px
  animation: block 5s linear

.up-arrow::before
  content: ''
  border-top: 10px solid transparent
  border-bottom: 10px solid blue
  border-right: 10px solid transparent
  border-left: 10px solid transparent
  position: absolute
  bottom: 5px

.down-arrow
  background-color: rgb(255, 0, 0)
  width: 20px
  height: 20px
  position: absolute
  z-index: 10
  top: 0
  left: 300px
  animation: block 5s linear

.down-arrow::before
  content: ''
  border-top: 10px solid blue
  border-bottom: 10px solid transparent
  border-right: 10px solid transparent
  border-left: 10px solid transparent
  position: absolute
  top: 5px

.right-arrow
  background-color: rgb(255, 0, 0)
  width: 20px
  height: 20px
  position: absolute
  z-index: 10
  top: 0
  left: 400px
  animation: block 5s linear

.right-arrow::before
  content: ''
  border-top: 10px solid transparent
  border-bottom: 10px solid transparent
  border-right: 10px solid transparent
  border-left: 10px solid blue
  position: absolute
  left: 5px

@keyframes block
  0%
    top: 0
  100%
    top: 100%
</style>
