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

.default-arrow
  font-size: 40px
  color: brown
  position: absolute
  z-index: 10
  top: 0
  animation: block 5s linear

.left-arrow
  left: calc(25% / 2)

.up-arrow
  left: calc(50% - (25% / 2))

.down-arrow
  left: calc(75% - (25% / 2))

.right-arrow
  left: calc(100% - (25% / 2))

@keyframes block
  0%
    top: 0
  100%
    top: 100%
</style>
