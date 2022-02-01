<template>
  <div>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'
// import { EActionArrow } from '@/store/modules/arrow/typesArrow'
import { EActionScore } from '@/store/modules/score/typesScore'
import { StoreModuleEnum } from '@/store/types'
import { EActionArrow, EGetterArrow, IArrowData } from '@/store/modules/arrow/typesArrow'

@Component
export default class Arrow extends Vue {
  arrowData!: IArrowData

  created () {
    this.arrowData = this.$store.getters[`${StoreModuleEnum.arrowStore}/${EGetterArrow.GET_LAST_ITEM}`] // for last added item in array
  }

  mounted () {
    this.$el.addEventListener('animationend', () => {
      this.deleteArrowFromStore(this.arrowData)
      this.$destroy()
    })
  }

  deleteArrowFromStore (payload: any) {
    this.$store.dispatch(`${StoreModuleEnum.arrowStore}/${EActionArrow.DELETE_ARROW}`, payload)
  }

  setScore (point: number): void {
    this.$store.dispatch(`${StoreModuleEnum.scoreStore}/${EActionScore.SET_POINTS}`, point)
  }
}
</script>

<style scoped lang="sass">
</style>
