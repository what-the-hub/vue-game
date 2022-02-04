<template>
  <div id="good" ref="good" :class="animationStyle['good']">
    <div id="excellent" ref="excellent" :class="animationStyle['excellent']">
    </div>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
import { IAreasPositions } from '@/types'
import { Emit, Watch } from 'vue-property-decorator'
import { IStateScore } from '@/store/modules/score/typesScore'

@Component
export default class Areas extends Vue {
  animationStyle: {[index: string]: string} = {
    good: '',
    excellent: ''
  }

  mapStyles: {[index: string]: string} = {
    good: 'good-animation',
    excellent: 'excellent-animation'
  }

  mounted (): void {
    this.getPositions()
  }

  @Emit('calculate-positions')
  getPositions (): IAreasPositions {
    const goodArea = this.$refs.good as Element
    const excellentArea = this.$refs.excellent as Element
    return {
      topGoodArea: goodArea.getBoundingClientRect().top,
      bottomGoodArea: goodArea.getBoundingClientRect().bottom,
      topExcellentArea: excellentArea.getBoundingClientRect().top,
      bottomExcellentArea: excellentArea.getBoundingClientRect().bottom
    }
  }

  @Watch('$store.state.scoreStore', { immediate: true, deep: true })
  onLastStyleChanged (val: IStateScore) {
    const style: string = val.lastStyle
    if (this.mapStyles[style]) {
      this.animationStyle[style] = this.mapStyles[style]
      setTimeout(() => {
        this.animationStyle[style] = ''
      }, 300)
    }
  }
}
</script>

<style scoped lang="sass">
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

.good-animation
  border-top: 2px solid rgb(245, 170, 73)
  border-bottom: 2px solid rgb(245, 170, 73)
  box-shadow: 0 0 43px 16px rgba(164, 138, 32, 0.33)

.excellent-animation
  border-top: 2px solid rgb(11, 168, 0)
  border-bottom: 2px solid rgb(11, 168, 0)
  box-shadow: 0 0 10px 16px rgba(73, 255, 1, 0.25)

</style>
