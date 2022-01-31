<template>
  <div>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
// import { EActionArrow } from '@/store/modules/arrow/typesArrow'
import { EActionScore } from '@/store/modules/score/typesScore'
import { StoreModuleEnum } from '@/store/types'
import { state } from '@/store/modules/arrow/arrow'
import { EActionArrow } from '@/store/modules/arrow/typesArrow'

@Component
export default class Arrow extends Vue {
  tempState: any
  arrowData: any
  mounted () {
    this.tempState = state.arrowsData
    this.arrowData = this.tempState[this.tempState.length - 1] // for last added item in array
    this.$el.addEventListener('animationend', () => {
      this.deleteArrowFromStore(this.arrowData)
      this.$destroy()
      // this.removeElement()
    })
    /*    this.getId()
    this.$store.dispatch(`${StoreModuleEnum.arrowStore}/${EActionArrow.ADD_DATA}`, {
      id: this.id,
      direction: this.className
    }) */
  }

  deleteArrowFromStore (payload: any) {
    this.$store.dispatch(`${StoreModuleEnum.arrowStore}/${EActionArrow.DELETE_ARROW}`, payload)
  }

  setScore (point: number): void {
    this.$store.dispatch(`${StoreModuleEnum.scoreStore}/${EActionScore.SET_POINTS}`, point)
  }

  beforeUnmount () {
    this.deleteArrowFromStore(this.arrowData)
  }

  removeElement (): void {
    this.$el.parentNode?.removeChild(this.$el)
  }
}
</script>

<style scoped lang="sass">
</style>
