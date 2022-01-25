<template>
  <div id="game" ref="game">
    <div id="score">0</div>
    <div>{{id}}</div>
    <button class="button-start" @click="startGame">start</button>
    <button class="button-start" @click="checkStore" style="margin-top: 60px">test</button>
    <div id="touch-area">
      <div id="good">
        <div id="excellent">
        </div>
      </div>
    </div>
    <arrow ref="afterClick" v-for="n in counts" :key="n" v-on:get-id="eventChild">
    </arrow>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Block } from '@/types'
import Arrow from '@/gameComponents/Arrow.vue'
import { arrowStore } from '@/store/modules/arrow/arrow'

@Component({
  components: {
    Arrow
  }
})
export default class Board extends Vue {
  id: any = 0
  gameFlow = document.getElementById('game')
  scoreElement = document.getElementById('score')
  scoreCounter: number = 0
  gameFlowHeight = 600
  block = new Block()
  counts: number = 0

  eventChild (value: any) {
    this.id = value
  }

  checkStore () {
    alert(JSON.stringify(arrowStore.state))
  }

  /*  checkTouch (item: any) {
    const itemPosition = parseInt(window.getComputedStyle(item).getPropertyValue('top'))
    const grMinHeight = 90
    const grMaxHeight = 60
    const goodMinHeight = 110
    const goodMaxHeight = 30
    const greatArea = itemPosition >= this.gameFlowHeight - grMinHeight && itemPosition <= this.gameFlowHeight - grMaxHeight
    const goodArea = itemPosition >= this.gameFlowHeight - goodMinHeight && itemPosition <= this.gameFlowHeight - goodMaxHeight

    if (greatArea) {
      this.scoreCounter += 2
    } else if (goodArea) {
      this.scoreCounter += 1
    }
  this.scoreElement!.textContent = this.scoreCounter.toString()
  } */

  delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  startGame () {
    this.counts += 1
    console.log('the game is on')
  }
}
</script>

<style scoped lang="sass">
*
  padding: 0
  margin: 0

#game
  width: 500px
  height: 600px
  border: 1px solid black
  margin: auto
  position: relative
  overflow: hidden

.button-start
  position: absolute
  top: 0
  right: 0

#touch-area
  width: 500px
  height: 100px
  background-color: rgba(232, 255, 204, 0.5)
  position: absolute
  bottom: 0

#good
  position: relative
  background: rgb(255, 241, 0)
  height: 80px
  top: 0

#excellent
  position: relative
  background: rgb(126, 255, 0)
  height: 40px
  top: 20px

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
