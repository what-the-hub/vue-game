<template>
  <div id="good" ref="good">
    <div id="excellent" ref="excellent">
    </div>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
import { IAreasPositions } from '@/types'

@Component
export default class Areas extends Vue {
  calculatePositions = (): IAreasPositions => {
    const goodArea = this.$refs.good as Element
    const excellentArea = this.$refs.excellent as Element
    return {
      topGoodArea: goodArea.getBoundingClientRect().top,
      bottomGoodArea: goodArea.getBoundingClientRect().bottom,
      topExcellentArea: excellentArea.getBoundingClientRect().top,
      bottomExcellentArea: excellentArea.getBoundingClientRect().bottom
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
</style>
