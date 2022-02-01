<template>
  <div
    :id="itemInfo.id"
    :class="itemInfo.direction"
    class="default-arrow">
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
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
}
</script>

<style scoped lang="sass">
.default-arrow
  width: 20px
  height: 20px
  background-color: rgb(255, 0, 0)
  position: absolute
  z-index: 10
  top: 0
  animation: block 5s linear

.left-arrow
  left: 20px

  &::before
    content: ''
    border-top: 10px solid transparent
    border-bottom: 10px solid transparent
    border-right: 10px solid blue
    position: absolute
    right: 5px

.up-arrow
  left: 200px

  &::before
    content: ''
    border-top: 10px solid transparent
    border-bottom: 10px solid blue
    border-right: 10px solid transparent
    border-left: 10px solid transparent
    position: absolute
    bottom: 5px

.down-arrow
  left: 300px

  &::before
    content: ''
    border-top: 10px solid blue
    border-bottom: 10px solid transparent
    border-right: 10px solid transparent
    border-left: 10px solid transparent
    position: absolute
    top: 5px

.right-arrow
  left: 400px

  &::before
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
