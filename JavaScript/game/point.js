export default class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    distance(other) {
        return Math.sqrt(Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2))
    }

    get isZero() {
        return this.x === 0 && this.y === 0
    }

    add(other) {
        this.x += other.x
        this.y += other.y
    }

    added(other) {
        return new Point(this.x + other.x, this.y + other.y)
    }

    subtracted(other) {
        return new Point(this.x - other.x, this.y - other.y)
    }

    floor() {
        this.x = Math.floor(this.x)
        this.y = Math.floor(this.y)
    }

    floored() {
        return new Point(Math.floor(this.x), Math.floor(this.y))
    }

    ceiled() {
        return new Point(Math.ceil(this.x), Math.ceil(this.y))
    }

    scaled(factor) {
        return new Point(this.x * factor, this.y * factor)
    }

    equals(other) {
        return this.x === other.x && this.y === other.y
    }

    clone() {
        return new Point(this.x, this.y)
    }
}