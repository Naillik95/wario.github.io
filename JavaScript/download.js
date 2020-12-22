import Game from './game/game.js'
import sounds from './game/sounds.js'

const modal = document.getElementById('modal-snake')
let game

function showModal(show) {
    // modal.style.display = show ? 'flex' : 'none'
    if (show) {
        modal.style.display = 'flex'
    }
    else {
        modal.classList.add('anim-out')
    }
}

function startGame() {
    game = new Game(document.querySelector("#snake-scene"))
    showModal(true)

    game.startGame()
    console.log(game)
}

function closeGame() {
    showModal(false)

    game.stop()
}

document.querySelectorAll('.play-btn').forEach(e => e.addEventListener('click', startGame))
document.querySelector('.close-button').addEventListener('click', closeGame)

document.querySelector('#snake-scene').addEventListener('game-ended', e => {
    document.querySelector('#before').style.display = 'none'
    document.querySelector('#win').style.display = e.detail.win ? 'block' : 'none'
    document.querySelector('#game-over').style.display = e.detail.win ? 'none' : 'block'

    if (!e.detail.win)
        sounds.afterGame.play()
    else
        sounds.afterWin.play()

    showModal(false)
})

modal.addEventListener('animationend', event => {
    if (event.animationName === 'anim-out') {
        modal.style.display = 'none'
        modal.classList.remove('anim-out')
    }
})
