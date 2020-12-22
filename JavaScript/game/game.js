import Collectable from './gameObjects/collectable.js'
import Player from './gameObjects/player.js'
import sounds from './sounds.js'

const music = new Audio('songs/warioware.mp3')
music.volume = 0.4
music.loop = true

export default class Game {
    static GameState = Object.freeze({
        NONE: 0,
        RUNNING: 1,
        GAME_OVER: 2,
        WIN: 3,
        PAUSED: 4
    })

    constructor(scene) {
        this.gameState = Game.GameState.NONE
        this.scene = scene
        this.backgroundCanvas = scene.children[0]
        this.backgroundCtx = this.backgroundCanvas.getContext('2d')

        this.canvas = scene.children[1]
        this.ctx = this.canvas.getContext('2d')
        this.ctx.font = '24px \'Fredoka One\', cursive'
        this.ctx.fillStyle = "#5C5336"

        this.player = new Player(this)
        this.collectable = new Collectable(this, 17)

        this.objects = [this.collectable, this.player]
        this.objectsToDestroy = []

        this._score = 0
        this.maxScore = 30
    }

    get score() {
        return this._score
    }

    set score(value) {
        this._score = Math.min(value, this.maxScore)
        if (this._score === this.maxScore)
            this.win()
    }

    drawBackground = () => {
        const ctx = this.backgroundCtx

        const boxSize = 35

        let color = '#D4B13D'
        for (let i = 0; i < 17; i++) {
            for (let j = 0; j < 17; j++) {
                color = color === '#D4B13D' ? '#DBC681' : '#D4B13D'
                ctx.fillStyle = color
                ctx.fillRect(boxSize * j, boxSize * i, boxSize, boxSize)
            }
        }
    }

    isSomethingHere = (point) => {
        this.objects.some(obj => obj.position.floored().equals(point))
    }

    isInGrid = (point) => {
        return point.x <= 17 && point.y <= 17 && point.x >= 0 && point.y >= 0
    }

    destroy(obj) {
        this.objectsToDestroy.push(obj)
    }

    doFrame = (timestamp) => {
        if (!this.lastTime) {
            this.lastTime = timestamp
        }
        const deltaTime = (timestamp - this.lastTime) / 1000
        this.lastTime = timestamp

        if (this.gameState === Game.GameState.PAUSED)
            return this.requestId = window.requestAnimationFrame(this.doFrame)

        const { width, height } = this.canvas
        this.ctx.clearRect(0, 0, width, height)

        this.objects.forEach(obj => {
            obj.update(deltaTime)
            obj.draw(this.ctx)
        })

        this.objectsToDestroy.forEach(obj => {
            const index = this.objects.indexOf(obj)
            this.objects.splice(index, 1)
        })
        this.objectsToDestroy.length = 0

        this.ctx.fillText(`${this.score}/${this.maxScore}`, 3, 25)

        if (this.gameState === Game.GameState.NONE)
            window.cancelAnimationFrame(this.requestId)
        else
            this.requestId = window.requestAnimationFrame(this.doFrame)
    }

    countDownStep = (timestamp) => {
        if (!this.lastTime) {
            this.lastTime = timestamp
        }
        const deltaTime = (timestamp - this.lastTime) / 1000
        this.lastTime = timestamp

        const { width, height } = this.canvas
        this.ctx.clearRect(0, 0, width, height)
        this.countDown -= deltaTime

        this.ctx.save()
        this.ctx.textAlign = 'center'
        this.ctx.fillStyle = '#ba771a'
        this.ctx.font = '150px \'Fredoka One\', cursive'

        this.ctx.fillText(Math.ceil(this.countDown), width / 2, height / 2, width)
        this.ctx.restore()

        if (this.countDown > 0)
            this.requestId = window.requestAnimationFrame(this.countDownStep)
        else {
            sounds.gameStart.play()
            this.requestId = window.requestAnimationFrame(this.doFrame)
        }
    }

    startGame = () => {
        console.log("Début du jeu")
        this.gameState = Game.GameState.RUNNING
        this.drawBackground()

        this._score = 0
        window.addEventListener('keydown', this.onKeyDown)

        this.countDown = 3
        this.requestId = window.requestAnimationFrame(this.countDownStep)
        sounds.countDown.play()
        music.play()
    }

    gameOver = () => {
        if (this.gameState !== Game.GameState.RUNNING)
            return
        console.log("Game Over")
        this.gameState = Game.GameState.GAME_OVER
        this.objects.forEach(obj => {
            obj.onGameOver()
        })
        sounds.gameOver.play()

        setTimeout(() => {
            this.stop()
            const event = new CustomEvent('game-ended', { detail: { win: false } })
            this.scene.dispatchEvent(event)
        }, 2000)
    }

    win = () => {
        if (this.gameState !== Game.GameState.RUNNING)
            return
        console.log("Victoire")
        this.gameState = Game.GameState.WIN
        sounds.win.play()

        setTimeout(() => {
            this.stop()
            const event = new CustomEvent('game-ended', { detail: { win: true } })
            this.scene.dispatchEvent(event)
        }, 2000)


    }

    stop = () => {
        console.log("Arrêt du jeu")
        this.gameState = Game.GameState.NONE
        window.removeEventListener('keydown', this.onKeyDown)
        this.lastTime = null
        this.objects.forEach(obj => obj.onGameEnded())
        music.pause()
        music.currentTime = 0
    }

    onKeyDown = (event) => {
        if (event.altKey && event.code === 'KeyP') {
            if (this.gameState === Game.GameState.PAUSED)
                this.gameState = this.previousState
            else {
                this.previousState = this.gameState
                this.gameState = Game.GameState.PAUSED
                console.log("Pause")
            }
        }
    }

}