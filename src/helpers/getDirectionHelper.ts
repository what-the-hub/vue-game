import { EDirection } from '@/types'

const arrowDirections: EDirection[] = [
  EDirection.ArrowLeft,
  EDirection.ArrowUp,
  EDirection.ArrowDown,
  EDirection.ArrowRight
]

export function getDirection (): EDirection {
  return arrowDirections[
    Math.floor(Math.random() * arrowDirections.length)
  ]
}
