import Vue from 'vue'

export enum EDirection {
  // eslint-disable-next-line no-unused-vars
  ArrowLeft = 'left-arrow',
  // eslint-disable-next-line no-unused-vars
  ArrowUp = 'up-arrow',
  // eslint-disable-next-line no-unused-vars
  ArrowDown = 'down-arrow',
  // eslint-disable-next-line no-unused-vars
  ArrowRight = 'right-arrow'
}

export enum EKeys {
  // eslint-disable-next-line no-unused-vars
  Left = 'ArrowLeft',
  // eslint-disable-next-line no-unused-vars
  Up = 'ArrowUp',
  // eslint-disable-next-line no-unused-vars
  Down = 'ArrowDown',
  // eslint-disable-next-line no-unused-vars
  Right = 'ArrowRight'
}

export interface IAreasPositions {
  topGoodArea: number,
  bottomGoodArea: number,
  topExcellentArea: number,
  bottomExcellentArea: number
}

export type VAreas = Vue & {
  calculatePositions: () => IAreasPositions
}
