<template>
  <div id="game" ref="game">
    <div id="score">
      {{ this.$store.state.scoreStore.score }}
    </div>
    <button class="button-start" @click="startGame">start</button>
    <button class="button-start" style="margin-top: 80px" @click="stopGame">stop</button>
    <div id="good" ref="good">
      <div id="excellent" ref="excellent">
      </div>
    </div>
    <arrow
      :bProps="positions"
      v-for="n in elements"
      :key="n.id"
      @get-data="getChildData"
      @get-id="setId"
      @removed="removeElement"
    >
    </arrow>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Arrow from '@/gameComponents/Arrow.vue'
import { EDirection, IArrowData, IFlowProps } from '@/types'
import { StoreModuleEnum } from '@/store/types'
import { EActionScore } from '@/store/modules/score/typesScore'
import { EActionArrow } from '@/store/modules/arrow/typesArrow'

@Component({
  components: {
    Arrow
  }
})
export default class Board extends Vue {
  id: number = 0
  counts: number = 0
  isPlay: boolean = false
  ind: number = 0
  elements: IArrowData[] = []

  getChildData (value: any): void {
    if (this.isPlay) {
      this.runRender(value)
    }
  }

  setId (value: any) {
    this.id = value
  }

  removeElement (value: any) {
    this.elements = this.elements.filter((e) => {
      return e.id !== value
    })
    console.log(this.elements, 'deleted')
  }

  delay (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  startGame (): void {
    console.log('the game is on')
    this.$store.dispatch(`${StoreModuleEnum.arrowStore}/${EActionArrow.ADD_DATA}`)
    this.elements.push({ id: 11, direction: EDirection.ArrowRight })
    window.addEventListener('keydown', this.logKey)
    this.isPlay = true
    this.counts += 1
  }

  runRender (value: any) {
    this.ind += 1
    const interval = setInterval(() => {
      this.elements.push({ id: value.id, direction: value.direction })
      clearInterval(interval)
      console.log(this.elements)
    }, this.getRandom(200, 2000))
  }

  stopGame (): void {
    this.isPlay = false
  }

  logKey (e: KeyboardEvent): void {
    const key: string = e.key
    const keyMap: { [index: string]: string } = {
      ArrowLeft: 'left-arrow',
      ArrowUp: 'up-arrow',
      ArrowDown: 'down-arrow',
      ArrowRight: 'right-arrow'
    }
    const singleEl = this.elements.find((e) =>
      e.direction === keyMap[key]
    )
    if (singleEl) {
      console.log('works')
      this.checkTouch(singleEl.id)
    }
  }

  checkTouch (id: any): void {
    console.log(id, 'found')
    console.log(document.getElementById(id))
    console.log(document.getElementById(id)?.getBoundingClientRect().top)

    // const itemHeight: number = this.$el.clientHeight
    // const itemPosition: number = this.$el.getBoundingClientRect().top + itemHeight / 2

    /*    const positions: { [index: string]: number } = {
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
    } */
  }

  setScore (point: number): void {
    this.$store.dispatch(`${StoreModuleEnum.scoreStore}/${EActionScore.SET_POINTS}`, point)
  }

  getRandom (min: number, max: number): number {
    return Math.floor((Math.random() * (max - min)) + min)
  }

  async renderBlocks (elements: number) {
    for (let i = 1; i < elements; i += 1) {
      await this.delay(this.getRandom(200, 2000))
      this.counts += 1 // push with appendChild to parent ref render node el with el
      // console.log(this.counts)
    }
  }

  get positions (): IFlowProps {
    const goodArea: any = this.$refs.good
    const exArea: any = this.$refs.excellent
    return {
      goodArTop: goodArea.getBoundingClientRect().top,
      goodArBottom: goodArea.getBoundingClientRect().bottom,
      exAreaTop: exArea.getBoundingClientRect().top,
      exAreaBottom: exArea.getBoundingClientRect().bottom
    }
  }
}
</script>

<style scoped lang="sass">
*
  padding: 0
  margin: 0

#game
  width: 500px
  height: 500px
  box-sizing: content-box
  border: 1px solid black
  margin: auto
  position: relative
  overflow: hidden

.button-start
  position: absolute
  top: 0
  right: 0

#good
  background: rgb(255, 241, 0)
  height: 100px
  width: 100%
  position: absolute
  bottom: 40px
  display: flex
  align-items: center
  justify-content: center

#excellent
  position: absolute
  width: 100%
  background: rgb(126, 255, 0)
  height: 40px

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
