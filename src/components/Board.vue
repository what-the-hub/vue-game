<template>
  <div id="game" ref="game">
    <div id="score">
      {{ this.$store.state.scoreStore.score }}
    </div>
    <button class="button-start" @click="startGame">start</button>
    <button class="button-start" style="margin-top: 80px" @click="stopGame">stop</button>
    <div>{{this.$store.state.arrowStore.arrowsData}}</div>
    <div id="good" ref="good">
      <div id="excellent" ref="excellent">
      </div>
    </div>
    <arrow
      v-for="n in storeItems"
      :key="n.id"
    >
    </arrow>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Arrow from '@/gameComponents/Arrow.vue'
import { EDirection, IFlowProps } from '@/types'
import { StoreModuleEnum } from '@/store/types'
import { EActionScore } from '@/store/modules/score/typesScore'
import { EActionArrow, IArrowData } from '@/store/modules/arrow/typesArrow'

@Component({
  components: {
    Arrow
  }
})
export default class Board extends Vue {
  isPlay: boolean = false
  safeLoop = 0

  delay (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  startGame (): void {
    console.log('the game is on')
    this.isPlay = true
    this.runRender()
    window.addEventListener('keydown', this.logKey)
  }

  runRender () {
    const interval = setInterval(() => {
      this.$store.dispatch(`${StoreModuleEnum.arrowStore}/${EActionArrow.ADD_DATA}`)
      this.safeLoop += 1
      clearInterval(interval)
      if (this.safeLoop < 1000 && this.isPlay) {
        this.runRender()
      } else {
        console.log('stop')
      }
    }, this.getRandom(200, 2000))
  }

  mounted () {
  }

  get storeItems () {
    return this.$store.state.arrowStore.arrowsData
  }

  stopGame (): void {
    this.isPlay = false
  }

  logKey (e: KeyboardEvent): void {
    const key: string = e.key
    const keyMap: { [index: string]: EDirection } = {
      ArrowLeft: EDirection.ArrowLeft,
      ArrowUp: EDirection.ArrowUp,
      ArrowDown: EDirection.ArrowDown,
      ArrowRight: EDirection.ArrowRight
    }
    const singleEl = this.$store.state.arrowStore.arrowsData.find((e: IArrowData) =>
      e.direction === keyMap[key]
    )
    if (singleEl) {
      this.checkTouch(singleEl.id)
    }
  }

  checkTouch (id: any): void {
    const item: HTMLElement = document.getElementById(id)!

    const itemHeight: number = 20
    const itemPosition: number = item.getBoundingClientRect().top + itemHeight / 2

    const positions: { [index: string]: number } = {
      exTop: this.positions.exAreaTop,
      exBottom: this.positions.exAreaBottom,
      goodTop: this.positions.goodArTop,
      goodBottom: this.positions.goodArBottom
    }
    const excellentArea: boolean = itemPosition >= positions.exTop &&
      itemPosition <= positions.exBottom
    const goodArea: boolean = itemPosition >= positions.goodTop &&
      itemPosition <= positions.goodBottom

    if (excellentArea) {
      this.setScore(2)
    } else if (goodArea) {
      this.setScore(1)
    }
  }

  setScore (point: number): void {
    this.$store.dispatch(`${StoreModuleEnum.scoreStore}/${EActionScore.SET_POINTS}`, point)
  }

  getRandom (min: number, max: number): number {
    return Math.floor((Math.random() * (max - min)) + min)
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
</style>
