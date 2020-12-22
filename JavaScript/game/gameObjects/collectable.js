import Point from '../point.js'
import GameObject from '../gameObject.js'

const sprite = new Image()
sprite.src = 'images/snake/bomb.png'

export default class Collectable extends GameObject {
    constructor(game, gridSize) {
        super(game)
        this.gridSize = gridSize

        this.position = this.randomPoint()
    }

    randomPoint() {
        return new Point(Math.floor(Math.random() * this.gridSize), Math.floor(Math.random() * this.gridSize))
    }

    collect() {
        do
            this.position = this.randomPoint()
        while (this.game.isSomethingHere(this.position));
    }

    sprite = sprite
}