<template>
  <div :id="id" ref="test" :class="direction">
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
import { Emit } from 'vue-property-decorator'
// import { EActionArrow } from '@/store/modules/arrow/typesArrow'
import { EActionScore } from '@/store/modules/score/typesScore'
import { StoreModuleEnum } from '@/store/types'
import { state } from '@/store/modules/arrow/arrow'

@Component
export default class Arrow extends Vue {
  idFromStore: any
  directionFromStore: any

  beforeMount () {
    const arrowData: any = state.arrowsData.slice(-1) // for last added item in array
    this.idFromStore = arrowData.id
    this.directionFromStore = arrowData.direction
  }

  get id () {
    return this.idFromStore
  }

  get direction () {
    return this.directionFromStore
  }

  mounted () {
    this.$el.addEventListener('animationend', () => {
      this.deleteEmit()
      this.$destroy()
      this.removeElement()
    })
    /*    this.getId()
    this.$store.dispatch(`${StoreModuleEnum.arrowStore}/${EActionArrow.ADD_DATA}`, {
      id: this.id,
      direction: this.className
    }) */
  }

  @Emit('removed')
  deleteEmit () {
    return this.id
  }

  setScore (point: number): void {
    this.$store.dispatch(`${StoreModuleEnum.scoreStore}/${EActionScore.SET_POINTS}`, point)
  }

  removeElement (): void {
    this.$el.parentNode?.removeChild(this.$el)
  }
}
</script>

<style scoped lang="sass">
</style>
