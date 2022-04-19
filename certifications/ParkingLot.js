class ParkingLot {
  constructor(slots) {
    this.size = slots
    this.slots = Array(slots).fill(null)
  }

  park(cardId) {
    const freeSlot = this.slots.findIndex(v => !v)

    if (freeSlot == -1) return false

    this.slots[freeSlot] = cardId
    return true
  }

  getSlots() {
    return this.slots
  }

  remove(carId) {
    const slot = this.slots.findIndex(v => v == carId)
    if (slot == -1) return false

    this.slots[slot] = null
    return true
  }
}