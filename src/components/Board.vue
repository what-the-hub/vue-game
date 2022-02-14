<template>
  <div id="game" ref="game">
    <div id="user-name">
      Username: {{ userEmail }}
    </div>
    <div id="score">
      Score: {{ this.$store.state.scoreStore.score }}
    </div>
    <button class="button-base" @click="startGame">start</button>
    <button class="button-base mt-5" @click="stopGame">stop</button>
    <button style="margin-top: 80px" @click="getDataDB">stop</button>
    <areas @calculate-positions="setPositions" />
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
import { EDirection, IAreasPositions } from '@/types'
import { StoreModuleEnum } from '@/store/types'
import { EActionScore } from '@/store/modules/score/typesScore'
import { EActionArrow, IArrowData } from '@/store/modules/arrow/typesArrow'
import { getRandom } from '@/helpers/getRandomHelper'
import Areas from '@/gameComponents/Areas.vue'
import { EGetterUser } from '@/store/modules/user/typesUser'
import 'vue-class-component/hooks'
import { getDB, onChange, updateUserDB } from '@/api/DBFirebaseHelpers'

@Component({
  components: {
    Arrow, Areas
  }
})
export default class Board extends Vue {
  isActive: boolean = false // flag for start and finish game
  safeLoop: number = 0
  positions!: IAreasPositions

  get storeArrows (): IArrowData[] {
    return this.$store.state.arrowStore.arrowsData
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

  mounted () {
    onChange()
  }

  async getDataDB () {
    await getDB()
    await updateUserDB()
    // await addUser()
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
</style>
