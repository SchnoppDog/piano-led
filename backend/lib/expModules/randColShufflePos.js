let rtPianoPosition = 0

function _getRandomShufflePosition(callerId, arrayLength) {
    let randShufPos     = Math.floor(Math.random() * arrayLength)

    if(callerId === 'lightStrip') {
        rtPianoPosition = randShufPos
        return randShufPos
    } else if(callerId === 'socketPianoKeyPress') {
        return rtPianoPosition
    }
}

module.exports.getRandomShufflePosition = (callerId, arrayLength) => {
    return _getRandomShufflePosition(callerId, arrayLength)
}