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

export interface IArrowData {
  id: number;
  direction: EDirection
}

export interface IFlowProps {
  goodArTop: number,
  goodArBottom: number,
  exAreaTop: number,
  exAreaBottom: number
}

export class Block {
  id = Date.now
  blockClasses = ['left-arrow', 'up-arrow', 'down-arrow', 'right-arrow']

  createItem () {
    const newItem = document.createElement('div')
    newItem.setAttribute('class', `${this.className} drop-block`)
    newItem.setAttribute('id', `${this.id}`)
    return newItem
  }

  getRandom = () => {
    const elements = Math.floor((Math.random() * 20) + 5)
    const timeout = Math.floor(Math.random() * 2000 + 200)
    const itemClass = this.blockClasses[Math.floor(Math.random() * this.blockClasses.length)]

    return {
      elements,
      timeout,
      itemClass
    }
  }

  className = this.getRandom().itemClass
}
