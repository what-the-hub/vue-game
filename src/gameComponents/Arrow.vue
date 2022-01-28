<template>
  <div :id="id" ref="test" :class="className">
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
import { Emit, Prop } from 'vue-property-decorator'
import { EActionArrow } from '@/store/modules/arrow/typesArrow'
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
    EDirection.ArrowUp,
    EDirection.ArrowRight
  ]

  className: string = this.arrowDirections[
    Math.floor(Math.random() * this.arrowDirections.length)
  ]

  mounted () {
    window.addEventListener('keydown', this.logKey)
    this.$el.addEventListener('animationend', () => {
      this.$destroy()
      this.removeElement()
      this.removeListener()
    })
    this.getId()
    this.$store.dispatch(`${StoreModuleEnum.arrowStore}/${EActionArrow.ADD_DATA}`, {
      id: this.id,
      direction: this.className
    })
  }

  removeListener (): void {
    window.removeEventListener('keydown', this.logKey)
  }

  @Emit('get-id')
  getId () {
    return this.id
  }

  @Emit('el-class')
  getDirection () {
    return this.className
  }

  logKey (e: KeyboardEvent): void {
    const key: string = e.key
    const keyMap: { [index: string]: string } = {
      ArrowLeft: 'left-arrow',
      ArrowUp: 'up-arrow',
      ArrowDown: 'down-arrow',
      ArrowRight: 'right-arrow'
    }
    if (keyMap[key] === this.className) {
      this.checkTouch(this.id)
    }
  }

  checkTouch (id: number): void {
    const itemHeight: number = this.$el.clientHeight
    const itemPosition: number = this.$el.getBoundingClientRect().top + itemHeight / 2

    const positions: { [index: string]: number } = {
      exTop: this.bProps.exAreaTop,
      exBottom: this.bProps.exAreaBottom,
      goodTop: this.bProps.goodArTop,
      goodBottom: this.bProps.goodArBottom
    }
    const excellentArea: boolean = itemPosition >= positions.exTop && itemPosition <= positions.exBottom
    const goodArea: boolean = itemPosition >= positions.goodTop && itemPosition <= positions.goodBottom

    if (excellentArea) {
      console.log('great')
      this.setScore(2)
    } else if (goodArea) {
      console.log('good')
      this.setScore(1)
    }
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
