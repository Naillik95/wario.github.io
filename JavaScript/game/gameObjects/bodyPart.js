import GameObject from '../gameObject.js'
import Point from '../point.js'
import sounds from '../sounds.js'
import ExplosionEffect from './explosionEffect.js'

const sprite = new Image()
sprite.src = 'images/snake/wario_head.png'

export default class BodyPart extends GameObject {
    constructor(game, initialPosition, follow) {
        super(game)
        this.position = initialPosition
        this.follow = follow
        this.speed = follow.speed

        const effect = new ExplosionEffect(game, initialPosition.clone())
        game.objects.push(effect)

        sounds.positiveWah.play()
    }

    sprite = sprite

    update(deltaTime) {
        if (this.exploding)
            return this.gameOverUpdate(deltaTime)
        const direction = this.follow.position.subtracted(this.position)
        this.position.add(direction.scaled(this.speed * deltaTime))
    }

    gameOverUpdate(deltaTime) {
        this.alpha -= this.fadeSpeed * deltaTime
        this.alpha = Math.max(0, this.alpha)
        this.position.add(this.direction.scaled(this.speed * deltaTime))
        if (this.alpha === 0) {
            this.game.destroy(this)
        }
    }

    draw(ctx) {
        if (this.alpha !== undefined) {
            ctx.globalAlpha = this.alpha
            ctx.drawImage(this.sprite, this.position.x * 35, this.position.y * 35)
            ctx.globalAlpha = 1
        }
        else
            ctx.drawImage(this.sprite, this.position.x * 35, this.position.y * 35)
    }

    onGameOver() {
        this.explode()
    }

    explode() {
        this.exploding = true
        this.direction = new Point(Math.random(), Math.random())
        this.alpha = 1
        this.fadeSpeed = 1
        this.speed = 9
    }

}