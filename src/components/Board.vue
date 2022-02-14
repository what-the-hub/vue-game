<template>
  <div class="board-wrapper">
    <div id="game" ref="game">
      <div id="user-name">
        Username: {{ userEmail }}
      </div>
      <div id="score">
        Score: {{ this.$store.state.scoreStore.score }}
      </div>
      <button
        class="button-base"
        @click="startGame"
        :disabled="storeArrows.length !== 0"
      >
        start
      </button>
      <button
        class="button-base mt-5"
        @click="stopGame"
        :disabled="storeArrows.length === 0"
      >
        stop
      </button>
      <areas @calculate-positions="setPositions" />
      <arrow
        v-for="n in storeArrows"
        :key="n.id"
      />
    </div>
    <score-list></score-list>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import Arrow from '@/gameComponents/Arrow.vue'
import { EDirection, IAreasPositions, IFirestoreUserScore } from '@/types'
import { StoreModuleEnum } from '@/store/types'
import { EActionScore } from '@/store/modules/score/typesScore'
import { EActionArrow, IArrowData } from '@/store/modules/arrow/typesArrow'
import { getRandom } from '@/helpers/getRandomHelper'
import Areas from '@/gameComponents/Areas.vue'
import { EActionUser, EGetterUser } from '@/store/modules/user/typesUser'
import 'vue-class-component/hooks'
import ScoreList from '@/gameComponents/ScoreList.vue'
import { checkAndUpdateUser } from '@/api/DBFirebaseHelpers'

@Component({
  components: {
    Arrow, Areas, ScoreList
  }
})
export default class Board extends Vue {
  isActive: boolean = false // flag for start and finish game
  safeLoop: number = 0
  positions!: IAreasPositions

  get storeArrows (): IArrowData[] {
    return this.$store.state.arrowStore.arrowsData
  }

  get storeScore (): number {
    return this.$store.state.scoreStore.score
  }

  get userEmail (): string {
    return this.$store.getters[
      `${StoreModuleEnum.userStore}/${EGetterUser.GET_USER_EMAIL}`
    ] || 'Unauthorized user'
  }

  setPositions (value: IAreasPositions): void {
    this.positions = value
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
        this.setStyle('excellent')
      } else if (goodArea) {
        this.setScore(1)
        this.setStyle('good')
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
      const gameData = this.getGameData()
      console.log(gameData, 'new')
      this.resetScore()
      await checkAndUpdateUser(gameData)
      await this.$store.dispatch(
        `${StoreModuleEnum.userStore}/${EActionUser.GET_DB_SCORE}`
      )
    }
  }

  getGameData (): IFirestoreUserScore {
    return {
      userData: this.$store.getters[
        `${StoreModuleEnum.userStore}/${EGetterUser.GET_USER_DATA}`
      ],
      scoreData: {
        date: Date.now(),
        score: this.storeScore
      }
    }
  }

  resetScore (): void {
    this.$store.dispatch(
      `${StoreModuleEnum.scoreStore}/${EActionScore.RESET_SCORE}`
    )
  }
}
</script>

<style scoped lang="sass">
*
  padding: 0
  margin: 0

#game
  width: 70%
  box-sizing: content-box
  border: 1px solid black
  height: 100%

  position: relative
  overflow: hidden

.button-base
  position: absolute
  top: 0
  right: 0

.board-wrapper
  display: flex
  flex-flow: row nowrap
  height: 500px
</style>
