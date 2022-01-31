import { EDirection } from '@/types'

const arrowDirections: EDirection[] = [
  EDirection.ArrowLeft,
  EDirection.ArrowUp,
  EDirection.ArrowDown,
  EDirection.ArrowRight
]

export const className: EDirection = arrowDirections[
  Math.floor(Math.random() * arrowDirections.length)
]
