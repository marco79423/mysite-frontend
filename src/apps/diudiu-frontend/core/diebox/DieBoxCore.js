export default class DieBoxCore {

  constructor() {
    this.dieList = []
    this.dieMap = new Map()
  }

  addDie = (die) => {
    this.dieList.push(die)
    this.dieMap.set(die.id, die)
  }

  getDie = (id) => {
    return this.dieMap.get(id)
  }

  getDieCount = () => {
    return this.dieList.length
  }

  clearDice = () => {
    this.dieList = []
    this.dieMap.clear()
  }

  allDiceStopped = () => {
    return this.dieList.filter(die => die.moving).length === 0
  }
}
