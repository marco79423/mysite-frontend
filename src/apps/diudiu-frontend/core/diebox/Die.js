import {generateID} from '@paji-sdk/utils'

export default class Die {
  constructor({position, velocity}) {
    this.id = generateID()
    this.position = position
    this.velocity = velocity

    this.moving = false
  }
}
