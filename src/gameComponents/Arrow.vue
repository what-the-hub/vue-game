<template>
  <div :id="id" ref="test" :class="className">
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
import { Emit, Prop } from 'vue-property-decorator'
// import { EActionArrow } from '@/store/modules/arrow/typesArrow'
import { EActionScore } from '@/store/modules/score/typesScore'
import { StoreModuleEnum } from '@/store/types'
import { EDirection, IFlowProps } from '@/types'

@Component
export default class Arrow extends Vue {
  id: number = Date.now()
  @Prop()
  bProps!: IFlowProps

  arrowDirections: string[] = [
    EDirection.ArrowLeft,
    EDirection.ArrowUp,
    EDirection.ArrowDown,
    EDirection.ArrowRight
  ]

  className: string = this.arrowDirections[
    Math.floor(Math.random() * this.arrowDirections.length)
  ]

  mounted () {
    this.getId()
    this.$el.addEventListener('animationend', () => {
      this.deleteEmit()
      this.$destroy()
      this.removeElement()
    })
    this.getData()
    /*    this.getId()
    this.$store.dispatch(`${StoreModuleEnum.arrowStore}/${EActionArrow.ADD_DATA}`, {
      id: this.id,
      direction: this.className
    }) */
  }

  removeListener (): void {
  }

  @Emit('get-data')
  getData () {
    return { id: this.id, direction: this.className }
  }

  @Emit('get-id')
  getId () {
    return this.id
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
