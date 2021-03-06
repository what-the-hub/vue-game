<template>
  <div class="board-wrapper">
    <div id="game">
      <div class="info-wrapper">
        <div>
          {{ userEmail }}
        </div>
        <div>
          Score: {{ storeScore }}
        </div>
      </div>
      <div class="buttons-wrapper">
        <button
          class="btn btn-success"
          @click="startGame"
          v-show="!isActive"
          :disabled="storeArrows.length !== 0"
        >
          start
        </button>
        <button
          class="btn btn-success"
          @click="stopGame"
          v-show="isActive"
          :disabled="!isActive"
        >
          stop
        </button>
      </div>

      <areas class="areas" @calculate-positions="setPositions"/>
      <div class="arrow-icons-wrapper">
        <p ref="bottom-left-arrow"><b-icon-arrow-left-square-fill/></p>
        <p ref="bottom-up-arrow"><b-icon-arrow-up-square-fill/></p>
        <p ref="bottom-down-arrow"><b-icon-arrow-down-square-fill/></p>
        <p ref="bottom-right-arrow"><b-icon-arrow-right-square-fill/></p>
      </div>
      <arrow
        v-for="arrow in storeArrows"
        :key="arrow.id"
      />
    </div>
    <score-list/>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import Arrow from '@/gameComponents/Arrow.vue'
import { EDirection, IAreasPositions } from '@/types'
import { StoreModuleEnum } from '@/store/types'
import { EActionScore } from '@/store/modules/score/typesScore'
import { EActionArrow, IArrowData } from '@/store/modules/arrow/typesArrow'
import { getRandom } from '@/helpers/getRandomHelper'
import Areas from '@/gameComponents/Areas.vue'
import { EActionUser, EGetterUser } from '@/store/modules/user/typesUser'
import 'vue-class-component/hooks'
import ScoreList from '@/gameComponents/ScoreList.vue'
import {
  BIconArrowUpSquareFill,
  BIconArrowDownSquareFill,
  BIconArrowLeftSquareFill,
  BIconArrowRightSquareFill
} from 'bootstrap-vue'

@Component({
  components: {
    Arrow,
    Areas,
    ScoreList,
    BIconArrowUpSquareFill,
    BIconArrowDownSquareFill,
    BIconArrowLeftSquareFill,
    BIconArrowRightSquareFill

  }
})
export default class Board extends Vue {
  isActive: boolean = false // flag for start and finish game
  safeLoop: number = 0
  positions!: IAreasPositions
  animationStyle: string = ''

  get storeArrows (): IArrowData[] {
    return this.$store.state.arrowStore.arrowsData
  }

  get storeScore (): number {
    return this.$store.state.scoreStore.score
  }

  get userEmail (): string {
    return this.$store.getters[
      `${StoreModuleEnum.userStore}/${EGetterUser.GET_USER_EMAIL}`
    ]
  }

  setPositions (value: IAreasPositions): void {
    this.positions = value
  }

  startGame (): void {
    console.log('the game is on')
    this.resetScore()
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
      this.checkArrowPosition(firstFondArrow.id, keyMap[key])
    }
    if (keyMap[key]) {
      this.setAnimationToBottomArrows(keyMap[key])
    }
  }

  checkArrowPosition (id: number, key: EDirection): void {
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
        this.setStyle('excellent')
        this.setAnimationToBottomArrows(key, true)
      } else if (goodArea) {
        this.setScore(1)
        this.setStyle('good')
        this.setAnimationToBottomArrows(key, true)
      }
    } else {
      console.log('Something wrong, please reload page')
    }
  }

  setAnimationToBottomArrows (direction: EDirection, isInArea?: boolean) {
    const elRef: string = 'bottom-' + direction
    const bottomArrowEl = this.$refs[elRef] as HTMLElement
    if (isInArea) {
      bottomArrowEl.classList.add('in-area-keydown-style')
      setTimeout(() => {
        bottomArrowEl.classList.remove('in-area-keydown-style')
      }, 100)
    } else {
      bottomArrowEl.classList.add('default-keydown-style')
      setTimeout(() => {
        bottomArrowEl.classList.remove('default-keydown-style')
      }, 100)
    }
  }

  setScore (point: number): void {
    this.$store.dispatch(
      `${StoreModuleEnum.scoreStore}/${EActionScore.SET_POINTS}`, point
    )
  }

  setStyle (style: string): void {
    this.$store.dispatch(
      `${StoreModuleEnum.scoreStore}/${EActionScore.SET_LAST_STYLE}`, style
    )
  }

  addArrow (): void {
    this.$store.dispatch(`${StoreModuleEnum.arrowStore}/${EActionArrow.ADD_DATA}`)
  }

  @Watch('storeArrows')
  async watchArrowsExists (newValue: IArrowData[]) {
    if (newValue.length === 0 && !this.isActive) {
      try {
        await this.storeUpdateDB()
      } catch (e) {
        throw new Error(e.message)
      }
    }
  }

  async storeUpdateDB () {
    await this.$store.dispatch(
      `${StoreModuleEnum.userStore}/${EActionUser.UPDATE_DB_SCORE}`, this.storeScore
    )
  }

  resetScore (): void {
    this.$store.dispatch(
      `${StoreModuleEnum.scoreStore}/${EActionScore.RESET_SCORE}`
    )
  }
}
</script>

<style scoped lang="sass">
@import 'src/styles/variables'
@import 'src/styles/functions'

*
  padding: 0
  margin: 0

.default-keydown-style
  color: $cl-df-key-pressed

.in-area-keydown-style
  color: $cl-ex-key-pressed

#game
  width: 100%
  box-sizing: border-box
  border: 2px solid $cl-borders
  border-radius: 10px
  height: $size-board
  grid-area: game-area
  display: grid
  grid-template-columns: 2fr 8fr 2fr
  grid-template-rows: 2fr 8fr 1fr
  grid-template-areas: 'up-left up-middle up-right' 'centre centre centre' 'down down down'
  position: relative
  overflow: hidden

.board-wrapper
  padding: 0 10px
  display: grid
  grid-template-columns: 8fr 4fr
  width: 100%
  grid-template-areas: 'game-area score-area'
  grid-column-gap: 10px
  height: $size-board

.areas
  grid-area: centre
  align-self: end

.buttons-wrapper
  grid-area: up-right
  margin: 20px
  z-index: 300
  button
    min-width: 70px

.info-wrapper
  grid-area: up-left
  margin: 20px

.arrow-icons-wrapper
  color: $cl-df-bottom-icons
  grid-area: down
  bottom: 0
  display: grid
  grid-template-columns: 3fr 3fr 3fr 3fr
  justify-items: center
  z-index: 100
  background: linear-gradient(0deg, $cl-white 70%, $cl-transparent 90%)

  p
    font-size: $size-icon
</style>
