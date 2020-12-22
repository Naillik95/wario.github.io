import GameObject from '../gameObject.js'

const sprites = []
for (let i = 1; i <= 4; i++) {
    const img = new Image()
    img.src = `images/snake/explosion/${i}.png`
    sprites.push(img)
}
Object.freeze(sprites)

export default class ExplosionEffect extends GameObject {
    constructor(game, position) {
        super(game)
        this.position = position
        this.sprites = [...sprites]
        this.sprite = this.sprites.shift()
        this.delay = 0.1
        this.elapseTime = 0
    }

    update(deltaTime) {
        this.elapseTime += deltaTime
        if (this.elapseTime > this.delay) {
            if (this.sprites.length > 0) {
                this.sprite = this.sprites.shift()
                this.elapseTime = 0
            } else {
                this.game.destroy(this)
            }
        }
    }
}