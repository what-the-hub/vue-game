<template>
  <div id="game" ref="game">
    <div id="score">
      {{ this.$store.state.scoreStore.score }}
    </div>
    <button class="button-base" @click="startGame">start</button>
    <button class="button-base mt-5" @click="stopGame">stop</button>
    <div id="good" ref="good">
      <div id="excellent" ref="excellent">
      </div>
    </div>
    <arrow
      v-for="n in storeArrows"
      :key="n.id"
    />
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
import { getRandom } from '@/helpers/getRandomHelper'

@Component({
  components: {
    Arrow
  }
})
export default class Board extends Vue {
  isActive: boolean = false // flag for start and finish game
  safeLoop: number = 0

  get storeArrows (): IArrowData[] {
    return this.$store.state.arrowStore.arrowsData
  }

  get positions (): IFlowProps {
    const goodArea = this.$refs.good as Element
    const excellentArea = this.$refs.excellent as Element
    return {
      topGoodArea: goodArea.getBoundingClientRect().top,
      bottomGoodArea: goodArea.getBoundingClientRect().bottom,
      topExcellentArea: excellentArea.getBoundingClientRect().top,
      bottomExcellentArea: excellentArea.getBoundingClientRect().bottom
    }
  }

  startGame (): void {
    console.log('the game is on')
    this.isActive = true
    this.runRender()
    window.addEventListener('keydown', this.onKeyDown)
  }

  runRender (): void {
    const interval = setInterval(() => {
      this.addArrow()
      this.safeLoop += 1
      clearInterval(interval)
      if (this.safeLoop < 1000 && this.isActive) {
        this.runRender()
      } else {
        this.isActive = false
        console.log('stop')
        setTimeout(() =>
          window.removeEventListener('keydown', this.onKeyDown),
        5000) // as an animation duration, to keep listener exist till arrows exist
      }
    }, getRandom(200, 2000))
  }

  stopGame (): void {
    this.isActive = false
  }

  onKeyDown (e: KeyboardEvent): void {
    const key: string = e.key
    const keyMap: { [index: string]: EDirection } = {
      ArrowLeft: EDirection.ArrowLeft,
      ArrowUp: EDirection.ArrowUp,
      ArrowDown: EDirection.ArrowDown,
      ArrowRight: EDirection.ArrowRight
    }
    const firstFondArrow = this.$store.state.arrowStore.arrowsData.find((e: IArrowData) =>
      e.direction === keyMap[key]
    )
    if (firstFondArrow) {
      this.checkArrowPosition(firstFondArrow.id)
    }
  }

  checkArrowPosition (id: number): void {
    const arrowEl: HTMLElement | null = document.getElementById(id.toString())
    if (arrowEl) {
      const itemHeight: number = arrowEl.clientHeight
      const itemPosition: number = arrowEl.getBoundingClientRect().top + itemHeight / 2

      const excellentArea: boolean = itemPosition >= this.positions.topExcellentArea &&
        itemPosition <= this.positions.bottomExcellentArea
      const goodArea: boolean = itemPosition >= this.positions.topGoodArea &&
        itemPosition <= this.positions.bottomGoodArea

      if (excellentArea) {
        this.setScore(2)
      } else if (goodArea) {
        this.setScore(1)
      }
    } else {
      console.log('Something wrong, please reload page')
    }
  }

  setScore (point: number): void {
    this.$store.dispatch(
      `${StoreModuleEnum.scoreStore}/${EActionScore.SET_POINTS}`, point
    )
  }

  addArrow (): void {
    this.$store.dispatch(`${StoreModuleEnum.arrowStore}/${EActionArrow.ADD_DATA}`)
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

.button-base
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
