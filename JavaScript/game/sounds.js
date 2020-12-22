const positiveWah = []
for (let i = 0; i < 5; i++)
    positiveWah.push(`positive-wah/${i}`)
const neutralWah = []
for (let i = 0; i < 12; i++)
    neutralWah.push(`neutral-wah/${i}`)
const negativeWah = []
for (let i = 0; i < 4; i++)
    negativeWah.push(`negative-wah/${i}`)

class SoundSet {
    constructor(volume, ...soundsName) {
        this.list = Object.freeze(soundsName.map(name => {
            const audio = new Audio(`sounds/${name}.wav`)
            audio.volume = volume
            return audio
        }))
        Object.freeze(this)
    }

    play() {
        const index = Math.floor(Math.random() * this.list.length)
        this.list[index].play()
    }
}

export default Object.freeze({
    gameOver: new SoundSet(1, 'game-over'),
    countDown: new SoundSet(1, 'get-ready'),
    gameStart: new SoundSet(1, 'lets-go', 'time-to-do-this', 'give-it-your-all'),
    afterGame: new SoundSet(1, 'no-more-for-you', 'all-over'),
    win: new SoundSet(1, 'laugh'),
    afterWin: new SoundSet(1, 'amazing', 'new-high-score', 'thanks-for-playing'),
    scoreUp: new SoundSet(1, 'tip-top', 'woah', 'next', 'ho-ho', 'alright', 'hey', 'ok', 'wario'),
    soundDown: new SoundSet(1, 'oh-no', 'oh-really', 'oh-come-on', 'oh-what-you-do', 'watch-out', 'what', 'no'),
    positiveWah: new SoundSet(0.5, ...positiveWah),
    neutralWah: new SoundSet(0.5, ...neutralWah),
    negativeWah: new SoundSet(0.75, ...negativeWah),
})