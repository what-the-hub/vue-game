<template>
  <div :id="id" ref="test" :class="className">
    {{ id }}
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
  @Prop(Object)
  bProps: IFlowProps | undefined

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
      this.checkTouch()
      // this.$store.dispatch(`${StoreModuleEnum.scoreStore}/${EActionScore.SET_POINTS}`, 1)
    }
  }

  checkTouch (): void {
    const itemHeight: number = this.$el.clientHeight
    const itemPosition: number = this.$el.getBoundingClientRect().top + itemHeight / 2
    console.log(itemPosition)
    if (!this.bProps) {
      console.log('error')
    } else {
      // const flowHeight: number | undefined = this.bProps?.flowHeight
      const positions: { [index: string]: any } = {
        exTop: this.bProps.exAreaTop,
        exHeight: this.bProps.exAreaHeight,
        exBottom: this.bProps.exAreaTop + this.bProps.exAreaHeight,
        goodTop: this.bProps.goodArTop,
        goodHeight: this.bProps.goodArHeight,
        goodBottom: this.bProps.goodArTop + this.bProps.goodArHeight
      }
      const greatArea: boolean = itemPosition >= positions.exTop && itemPosition <= positions.exBottom
      const goodArea: boolean = itemPosition >= positions.goodTop && itemPosition <= positions.goodBottom

      if (greatArea) {
        // this.removeListener()
        console.log('great')
        this.setScore(2)
      } else if (goodArea) {
        // this.removeListener()
        console.log('good')
        this.setScore(1)
      }
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
*
  padding: 0
  margin: 0

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
    top: 580px
</style>
