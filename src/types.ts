export interface UserInputData {
  email: string;
  password: string;
}

export interface Errors {
  emailEr: RegExpMatchArray | boolean;
  passwordEr: RegExpMatchArray | boolean;
}

export class Block {
  id = Date.now
  blockClasses = ['left-arrow', 'up-arrow', 'down-arrow', 'right-arrow']

  createItem () {
    const newItem = document.createElement('div')
    newItem.setAttribute('class', `${this.className} drop-block`)
    /*    newItem.setAttribute('id', `${Date.now}`) */
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
