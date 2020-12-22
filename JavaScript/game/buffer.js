export default class Buffer {
    constructor (size) {
        this.size = size
        this.slots = []
        for (let i = 0; i < size; i++) {
            this.slots.push(undefined)
        }
    }

    put (data) {
        if (this.slots.length < this.size) {
            this.slots.push(data)
        }
    }

    get () {
        return this.slots.shift()
    }
}