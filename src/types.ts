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

export interface ICurrentUserDB {
  scoreList: IFirestoreScore[] | [],
  email: string
}
