<template>
    <p
      :id="arrowData.id"
      :class="arrowData.direction"
      class="default-arrow">
      <b-icon :icon="iconName"/>
    </p>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
import { StoreModuleEnum } from '@/store/types'
import { EActionArrow, EGetterArrow, IArrowData } from '@/store/modules/arrow/typesArrow'
import { EDirection } from '@/types'

@Component
export default class Arrow extends Vue {
  arrowData!: IArrowData
  iconName!: string
  iconsMap: {[index in EDirection ]: string} = {
    [EDirection.ArrowLeft]: 'arrow-left-square',
    [EDirection.ArrowUp]: 'arrow-up-square',
    [EDirection.ArrowDown]: 'arrow-down-square',
    [EDirection.ArrowRight]: 'arrow-right-square'
  }

  created () {
    this.arrowData = this.getLastArrowFromStore()
    this.iconName = this.iconsMap[this.arrowData.direction!]
  }

  mounted () {
    this.$el.addEventListener('animationend', () => {
      this.deleteLastArrow()
      this.$destroy()
    })
  }

  getLastArrowFromStore (): IArrowData {
    return this.$store.getters[
      `${StoreModuleEnum.arrowStore}/${EGetterArrow.GET_LAST_ITEM}`
    ] // for last added item in array
  }

  deleteLastArrow (): void {
    this.$store.dispatch(
      `${StoreModuleEnum.arrowStore}/${EActionArrow.DELETE_ARROW}`
    )
  }
}
</script>

<style scoped lang="sass">
@import 'src/styles/variables'
@import 'src/styles/functions'

.default-arrow
  font-size: $size-icon
  color: $cl-dropping-icons
  position: absolute
  z-index: 10
  top: 0
  animation: block 5s linear

svg
  animation: dropping-animation 6s linear

.left-arrow
  left: calcPosition(25%)

.up-arrow
  left: calcPosition(50%)

.down-arrow
  left: calcPosition(75%)

.right-arrow
  left: calcPosition(100%)

@keyframes dropping-animation
  0%
    filter: drop-shadow(0px 0px 1px rgba(0, 252, 80, 0.4))
  70%
    filter: drop-shadow(0px -100px 20px rgba(0, 252, 80, 0.3))
  90%
    filter: drop-shadow(0px -100px 20px $cl-transparent)
  100%
    filter: drop-shadow(0px -10px 50px $cl-transparent)

@keyframes block
  0%
    top: 0
  100%
    top: 100%
</style>
