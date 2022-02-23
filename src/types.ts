export enum EDirection {
  ArrowLeft = 'left-arrow',
  ArrowUp = 'up-arrow',
  ArrowDown = 'down-arrow',
  ArrowRight = 'right-arrow'
}

export interface IAreasPositions {
  topGoodArea: number,
  bottomGoodArea: number,
  topExcellentArea: number,
  bottomExcellentArea: number
}

export interface IFirestoreUser {
  uid: string,
  email: string | null | undefined
}

export interface IFirestoreScore {
  date: number,
  score: number
}

export interface IFirestoreUserScore {
  userData: IFirestoreUser,
  scoreData: IFirestoreScore
}
