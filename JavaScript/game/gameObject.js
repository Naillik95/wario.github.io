import Point from './point.js'

export default class GameObject {
    constructor(game) {
        this.game = game
    }

    position = new Point()

    update(deltaTime) { }

    draw(ctx) {
        ctx.drawImage(this.sprite, this.position.x * 35, this.position.y * 35)
    }

    onGameEnded() { }

    onGameOver() { }

    remove() {
        const index = this.game.objects.indexOf(this)
        this.game.objects.splice(index, 1)
        this.game.objects.filter(obj => obj !== this)
    }

}