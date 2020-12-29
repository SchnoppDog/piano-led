let rtPianoPosition = 0

function _getRandomShufflePosition(callerId, arrayLength) {
    let randShufPos     = Math.floor(Math.random() * arrayLength)

    if(callerId === 'socketPianoCss') {
        rtPianoPosition = randShufPos
        return randShufPos
    } else if(callerId === 'lightStrip') {
        return rtPianoPosition
    }
}

module.exports.getRandomShufflePosition = (callerId, arrayLength) => {
    return _getRandomShufflePosition(callerId, arrayLength)
}