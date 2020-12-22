import GameObject from '../gameObject.js'
import Point from '../point.js'
import Buffer from '../buffer.js'
import BodyPart from './bodyPart.js'
import sounds from '../sounds.js'

const sprite = new Image()
sprite.src = 'images/snake/wario_head.png'

export default class Player extends GameObject {
    static Direction = Object.freeze({
        UP: new Point(0, -1),
        RIGHT: new Point(1, 0),
        DOWN: new Point(0, 1),
        LEFT: new Point(-1, 0)
    })

    constructor(game) {
        super(game)

        this.direction = Player.Direction.RIGHT
        this.speed = 7

        this.inputBuffer = new Buffer(3)

        this.position = new Point(8, 8)
        this.destination = this.position.added(this.direction)

        this.bodyParts = []

        this.playSounds()
        window.addEventListener('keydown', this.onKeyDown)
    }

    sprite = sprite

    update(deltaTime) {
        this.position.add(this.direction.scaled(this.speed * deltaTime))

        if (!this.game.isInGrid(this.position.ceiled()))
            return this.game.gameOver()

        const distance = this.position.distance(this.destination)

        if (distance > this.previousDistance) {
            this.previousDistance = Infinity

            if (this.bodyParts.some(obj => obj.position.distance(this.position) < 0.65)) {
                const penalty = Math.ceil(this.bodyParts.length / 2)
                this.removeParts(penalty)
                this.game.score -= penalty
                sounds.soundDown.play()
                for (let i = 0; i < penalty; i++) {
                    setTimeout(() => sounds.negativeWah.play(), 20 * i)
                }
            }

            if (this.position.floored().equals(this.game.collectable.position)) {
                this.game.collectable.collect()
                this.addPart()
                this.game.score++
                if (this.game.score < 30)
                    sounds.scoreUp.play()
            }

            const input = this.inputBuffer.get()
            if (input && !this.direction.added(input).isZero && !this.direction.equals(input)) {
                this.position = this.destination.clone()
                this.direction = input
            }

            this.destination.add(this.direction)

        }
        else
            this.previousDistance = distance
    }

    addPart() {
        const follow = this.lastBodyPart || this
        const bodyPart = new BodyPart(this.game, follow.position.subtracted(this.direction), follow)
        this.lastBodyPart = bodyPart
        this.game.objects.push(bodyPart)
        this.bodyParts.push(bodyPart)
    }

    removeParts(amount) {
        for (let i = 0; i < amount; i++) {
            this.bodyParts.pop().explode()
        }
        this.lastBodyPart = this.bodyParts[this.bodyParts.length - 1]
    }

    onKeyDown = (event) => {
        switch (event.code) {
            case 'KeyW':
            case 'ArrowUp':
                this.inputBuffer.put(Player.Direction.UP)
                break
            case 'KeyD':
            case 'ArrowRight':
                this.inputBuffer.put(Player.Direction.RIGHT)
                break
            case 'KeyS':
            case 'ArrowDown':
                this.inputBuffer.put(Player.Direction.DOWN)
                break
            case 'KeyA':
            case 'ArrowLeft':
                this.inputBuffer.put(Player.Direction.LEFT)
                break
        }
    }

    onGameOver() {
        this.game.destroy(this)
        clearTimeout(this.timeoutId)
    }

    onGameEnded() {
        window.removeEventListener('keydown', this.onKeyDown)
        clearTimeout(this.timeoutId)
    }

    playSounds = () => {
        for (let i = 0; i < Math.floor(this.bodyParts.length * 0.2); i++)
            setTimeout(() => sounds.neutralWah.play(), i * 150)

        this.timeoutId = setTimeout(this.playSounds, (Math.random() * 1500) + 1000)
    }
}