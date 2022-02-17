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

@Component
export default class Arrow extends Vue {
  arrowData!: IArrowData
  iconName!: string
  iconsMap: {[index: string]: string} = {
    'left-arrow': 'arrow-left-square',
    'up-arrow': 'arrow-up-square',
    'down-arrow': 'arrow-down-square',
    'right-arrow': 'arrow-right-square'
  }

  created () {
    this.arrowData = this.getLastArrow()
    this.iconName = this.iconsMap[this.arrowData.direction!]
  }

  mounted () {
    this.$el.addEventListener('animationend', () => {
      this.deleteLastArrow()
      this.$destroy()
    })
  }

  getLastArrow (): IArrowData {
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
  color: brown
  position: absolute
  z-index: 10
  top: 0
  animation: block 5s linear

.left-arrow
  left: calcPosition(25%)

.up-arrow
  left: calcPosition(50%)

.down-arrow
  left: calcPosition(75%)

.right-arrow
  left: calcPosition(100%)

@keyframes block
  0%
    top: 0
  100%
    top: 100%
</style>
